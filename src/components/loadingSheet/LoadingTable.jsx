import React, { useState, useEffect, useRef } from "react";
import { db } from "../../utilities/firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp, query, orderBy, getDoc, where, limit } from "firebase/firestore";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import 'bootstrap-icons/font/bootstrap-icons.css';

const BillManagement = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [newBillItems, setNewBillItems] = useState([]);
  const [processedUnits, setProcessedUnits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [printMode, setPrintMode] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [driverName, setDriverName] = useState("");
  const [route, setRoute] = useState("");
  const [creatorFilter, setCreatorFilter] = useState("");
  const [creators, setCreators] = useState([]);
  const [billStoreStatus, setBillStoreStatus] = useState({});

  const billsCollectionRef = collection(db, "Bill");
  const productsCollectionRef = collection(db, "Product");
  const processedBillsCollectionRef = collection(db, "ProcessedBills");
  const billStoreStatusCollectionRef = collection(db, "BillStoreStatus");

  useEffect(() => {
    fetchBills();
    fetchProcessedUnits();
    fetchBillStoreStatus();
  }, []);

  const fetchBillStoreStatus = async () => {
    try {
      const querySnapshot = await getDocs(billStoreStatusCollectionRef);
      const statusData = {};
      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        statusData[data.billId] = {
          id: doc.id,
          isStoredOut: data.isStoredOut || false,
          isStoredIn: data.isStoredIn || false
        };
      });
      setBillStoreStatus(statusData);
    } catch (error) {
      console.error("Error fetching bill store status:", error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(productsCollectionRef);
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        options: doc.data().productOptions || [],
      }));
      setProducts(productList);
      return productList; // Return products to be used by fetchBills
    } catch (error) {
      console.error("Error fetching products:", error.message);
      return [];
    }
  };

  const fetchBills = async () => {
    try {
      // First fetch products to get accurate margin data
      const productList = await fetchProducts();
      console.log("Fetched products:", productList);
      
      const q = query(billsCollectionRef, orderBy("createDate", "desc"));
      const querySnapshot = await getDocs(q);
      let billList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      // Enrich bills with correct margin data
      billList = billList.map(bill => {
        if (bill.productOptions && bill.productOptions.length > 0) {
          const enrichedOptions = bill.productOptions.map(option => {
            console.log("Processing option:", option);
            
            // Find the corresponding product
            const product = productList.find(p => p.id === option.productId);
            if (product && product.options) {
              console.log("Found product:", product.name);
              // Find the matching option - handle both name match and direct optionId match
              const productOption = product.options.find(po => 
                (po.name && option.optionId && po.name.toString() === option.optionId.toString()) || 
                (po.name && po.name.toString() === option.optionName)
              );
              
              if (productOption) {
                console.log("Found matching option:", productOption);
                const retailPrice = parseFloat(productOption.retailPrice) || parseFloat(option.price) || 0;
                const dbPrice = parseFloat(productOption.dbPrice) || 0;
                
                // Set margin to 0 if either retailPrice or dbPrice is 0 or missing
                const calculatedMargin = (!retailPrice || !dbPrice) ? 0 : (retailPrice - dbPrice);
                console.log(`Calculated margin: ${retailPrice} - ${dbPrice} = ${calculatedMargin}`);
                
                return {
                  ...option,
                  dbPrice: dbPrice,
                  retailPrice: retailPrice,
                  margin: calculatedMargin
                };
              } else {
                console.log("No matching option found in product");
              }
            } else {
              console.log("Product not found or has no options");
            }
            
            // If no match found, calculate margin from option's own data
            const retailPrice = parseFloat(option.retailPrice) || parseFloat(option.price) || 0;
            const dbPrice = parseFloat(option.dbPrice) || 0;
            
            // Set margin to 0 if either retailPrice or dbPrice is 0 or missing
            const calculatedMargin = (!retailPrice || !dbPrice) ? 0 : (retailPrice - dbPrice);
            console.log(`Fallback margin calculation: ${retailPrice} - ${dbPrice} = ${calculatedMargin}`);
            
            return {
              ...option,
              margin: calculatedMargin
            };
          });
          
          return {
            ...bill,
            productOptions: enrichedOptions
          };
        }
        return bill;
      });
      
      console.log("Enriched bills:", billList);
      setBills(billList);
      
      // Extract unique creators from bills
      const uniqueCreators = [...new Set(billList.map(bill => bill.createdBy || "Unknown"))];
      setCreators(uniqueCreators);
    } catch (error) {
      console.error("Error fetching bills:", error.message);
    }
  };

  const fetchProcessedUnits = async () => {
    try {
      // First fetch products to get product data for margin calculations
      const productList = await fetchProducts();
      console.log("Fetched products for margin calculation:", productList);
      
      const q = query(processedBillsCollectionRef, orderBy("unitId", "desc"));
      const querySnapshot = await getDocs(q);
      let processedList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      // Process units to ensure margin information
      processedList = processedList.map(unit => {
        console.log(`Processing unit ${unit.unitId} for margin calculation`);
        
        if (unit.bills && unit.bills.length > 0) {
          const enrichedBills = unit.bills.map(bill => {
            if (!bill.products || bill.products.length === 0) {
              console.log(`Bill ${bill.billNo} has no products`);
              return bill;
            }
            
            const enrichedProducts = bill.products.map(product => {
              console.log(`Processing product for margin in bill ${bill.billNo}`);
              
              // Find the matching product from the product list
              const matchingProduct = productList.find(p => p.id === product.productId);
              let dbPrice = parseFloat(product.dbPrice) || 0;
              
              // If we don't have dbPrice but have matching product, try to get it
              if ((!dbPrice || dbPrice === 0) && matchingProduct && matchingProduct.options) {
                const productOption = matchingProduct.options.find(po => 
                  (po.name && product.optionId && po.name.toString() === product.optionId.toString()) || 
                  (po.name && po.name.toString() === product.optionName)
                );
                
                if (productOption) {
                  dbPrice = parseFloat(productOption.dbPrice) || 0;
                  console.log(`Found db price ${dbPrice} from product database`);
                }
              }
              
              // Calculate margin
              const price = parseFloat(product.price) || 0;
              const qty = parseFloat(product.qty) || 0;
              
              // Set margin to 0 if either retailPrice or dbPrice is 0 or missing
              const calculatedMargin = (!price || !dbPrice) ? 0 : (price - dbPrice);
              
              return {
                ...product,
                dbPrice: dbPrice,
                margin: calculatedMargin
              };
            });
            
            return {
              ...bill,
              products: enrichedProducts
            };
          });
          
          return {
            ...unit,
            bills: enrichedBills
          };
        }
        
        return unit;
      });
      
      console.log("Processed units with margin data:", processedList);
      setProcessedUnits(processedList);
    } catch (error) {
      console.error("Error fetching processed units:", error.message);
    }
  };

  const handleViewBill = (bill) => {
    setSelectedBill(bill);
  };

  const handleClosePopup = () => {
    setSelectedBill(null);
    setPrintMode(false);
  };

  const handleAddToNewBill = (bill) => {
    const alreadyAdded = newBillItems.some(item => item.billId === bill.id);
    if (alreadyAdded) {
      alert("This bill has already been added!");
      return;
    }
    
    // Add bill to newBillItems
    setNewBillItems(prevItems => [...prevItems, {
      billId: bill.id,
      billNo: bill.billNo,
      outletName: bill.outletName,
      products: bill.productOptions.map(opt => ({
        ...opt,
        bottlesPerCase: null,
        caseCount: 0,
        extraBottles: 0
      })),
      date: selectedDate
    }]);
  };

  const handleBottlesPerCaseChange = (billIndex, productIndex, value) => {
    const newItems = [...newBillItems];
    
    // Get the product details from the first instance
    const firstInstance = newItems[billIndex].products[productIndex];
    const productId = firstInstance.productId;
    const optionId = firstInstance.optionId;
    
    // Update all instances of this product across all bills
    newItems.forEach((item, itemIndex) => {
      item.products.forEach((product, prodIndex) => {
        if (product.productId === productId && product.optionId === optionId) {
          const qty = parseInt(product.qty) || 0;
          newItems[itemIndex].products[prodIndex].bottlesPerCase = value;
          newItems[itemIndex].products[prodIndex].caseCount = Math.floor(qty / value);
          newItems[itemIndex].products[prodIndex].extraBottles = qty % value;
        }
      });
    });
    
    setNewBillItems(newItems);
  };

  const handleDeleteItem = async (billIndex) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const newItems = newBillItems.filter((_, index) => index !== billIndex);
      setNewBillItems(newItems);
    }
  };

  const handleDeleteProcessedUnit = async (id) => {
    if (window.confirm("Are you sure you want to delete this processed unit?")) {
      try {
        // First get the unit details to get the unitId
        const unitDoc = await getDoc(doc(db, "ProcessedBills", id));
        if (unitDoc.exists()) {
          const unitData = unitDoc.data();
          const unitId = unitData.unitId;
          
          // Delete from ProcessedBills collection
          await deleteDoc(doc(db, "ProcessedBills", id));
          
          // Find and delete corresponding document in BillReviews collection
          const billReviewsCollectionRef = collection(db, "BillReviews");
          const q = query(billReviewsCollectionRef, where("unitId", "==", unitId));
          const querySnapshot = await getDocs(q);
          
          // Delete each matching document
          const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
          await Promise.all(deletePromises);
          
          if (querySnapshot.docs.length > 0) {
            console.log(`Deleted ${querySnapshot.docs.length} matching BillReview document(s)`);
          }
          
          // Update UI by removing the deleted unit
          setProcessedUnits(processedUnits.filter(unit => unit.id !== id));
        }
      } catch (error) {
        console.error("Error deleting processed unit:", error.message);
      }
    }
  };

  const handleEditProcessedUnit = async (unit) => {
    try {
      console.log("Editing unit:", unit.unitId);
      
      // Set driver name and route from the unit
      setDriverName(unit.driverName || "");
      setRoute(unit.route || "");
      
      // Add the unit's bills to newBillItems
      if (unit.bills && unit.bills.length > 0) {
        // Convert unit bills to the format expected by newBillItems
        const formattedBills = unit.bills.map(bill => {
          return {
            billId: bill.billId || bill.id || "",
            billNo: bill.billNo || "",
            outletName: bill.outletName || "",
            products: (bill.products || []).map(product => ({
              ...product,
              bottlesPerCase: product.bottlesPerCase || null,
              caseCount: product.caseCount || 0,
              extraBottles: product.extraBottles || 0
            })),
            date: bill.date || selectedDate
          };
        });
        
        // Update newBillItems state
        setNewBillItems(formattedBills);
      }
      
      // Delete the old unit
      await handleDeleteProcessedUnit(unit.id);
      
      // Refresh processed units to update the UI
      await fetchProcessedUnits();
      
      console.log("Successfully prepared unit for editing:", unit.unitId);
    } catch (error) {
      console.error("Error editing processed unit:", error.message);
      alert("Error editing unit. Please try again.");
    }
  };

  const handleViewProcessedUnit = (unit) => {
    setSelectedBill(unit);
    setPrintMode(false);
  };

  const handlePrintUnit = (unit) => {
    setSelectedBill(unit);
    setPrintMode(true);
  };

  const generateUnitId = () => {
    if (processedUnits.length === 0) return "UNIT1";
    
    // Sort processedUnits by unitId in descending order to ensure we get the highest unitId
    const sortedUnits = [...processedUnits].sort((a, b) => {
      const numA = parseInt(a.unitId.replace("UNIT", "")) || 0;
      const numB = parseInt(b.unitId.replace("UNIT", "")) || 0;
      return numB - numA;
    });
    
    const lastUnitId = sortedUnits[0].unitId;
    const lastNumber = parseInt(lastUnitId.replace("UNIT", ""));
    return `UNIT${lastNumber + 1}`;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (newBillItems.length === 0) {
        alert("No bills to save!");
        return;
      }

      if (!driverName.trim()) {
        alert("Please enter Driver Name");
        return;
      }

      if (!route.trim()) {
        alert("Please enter Route");
        return;
      }

      // Group products by their unique identifiers
      const consolidatedProducts = [];
      
      // First, group by optionId
      const optionGroups = {};
      
      newBillItems.forEach(item => {
        item.products.forEach(product => {
          const optionId = product.optionId;
          if (!optionGroups[optionId]) {
            optionGroups[optionId] = [];
          }
          optionGroups[optionId].push({
            billId: item.billId,
            productId: product.productId,
            product: product
          });
        });
      });
      
      // Then process each option group
      Object.entries(optionGroups).forEach(([optionId, entries]) => {
        // Group by product within this option
        const productGroups = {};
        
        entries.forEach(entry => {
          const productId = entry.productId;
          if (!productGroups[productId]) {
            productGroups[productId] = [];
          }
          productGroups[productId].push(entry);
        });
        
        // Process each product group
        Object.entries(productGroups).forEach(([productId, productEntries]) => {
          const productName = products.find(p => p.id === productId)?.name || 'Unknown';
          const firstProduct = productEntries[0].product;
          
          // Calculate total quantity
          const totalQty = productEntries.reduce((sum, entry) => {
            return sum + (parseInt(entry.product.qty) || 0);
          }, 0);
          
          // Create consolidated product entry
          consolidatedProducts.push({
            optionId: optionId,
            productId: productId,
            productName: productName,
            bottlesPerCase: firstProduct.bottlesPerCase,
            totalQty: totalQty,
            caseCount: firstProduct.bottlesPerCase ? Math.floor(totalQty / firstProduct.bottlesPerCase) : 0,
            extraBottles: firstProduct.bottlesPerCase ? totalQty % firstProduct.bottlesPerCase : 0
          });
        });
      });

      // Calculate margin for each bill
      const billsWithMargins = newBillItems.map(bill => {
        // Calculate the total margin for this bill
        const totalMargin = calculateBillMargin(bill);
        return {
          ...bill,
          totalMargin: totalMargin
        };
      });

      // Calculate total unit margin
      const totalUnitMargin = billsWithMargins.reduce((sum, bill) => {
        return sum + (parseFloat(bill.totalMargin) || 0);
      }, 0);

      const unitId = generateUnitId();
      const unitData = {
        unitId,
        date: selectedDate,
        driverName,
        route,
        bills: billsWithMargins,
        consolidatedProducts: consolidatedProducts,
        totalMargin: totalUnitMargin,
        createdAt: serverTimestamp(),
      };

      console.log("Saving unit data with margins:", unitData);
      const docRef = await addDoc(processedBillsCollectionRef, unitData);
      console.log("Unit written with ID: ", docRef.id);

      alert("Unit saved successfully!");
      setNewBillItems([]);
      setDriverName("");
      setRoute("");
      await fetchProcessedUnits(); // Refresh processed units
    } catch (error) {
      console.error("Error saving unit:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateProductTotal = (options) => {
    return options.reduce((sum, option) => sum + ((parseFloat(option.price) || 0) * (parseFloat(option.qty) || 0)), 0).toFixed(2);
  };

  const calculateTotal = (options) => {
    return options.reduce((sum, option) => sum + (parseFloat(option.total) || 0), 0).toFixed(2);
  };

  const handleCreatorFilterChange = (e) => {
    setCreatorFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when changing filters
  };

  const filteredBills = bills.filter(bill => 
    (bill.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.outletName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.salesRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.refContact.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (creatorFilter === "" || (bill.createdBy || "Unknown") === creatorFilter)
  );

  const indexOfLastBill = currentPage * itemsPerPage;
  const indexOfFirstBill = indexOfLastBill - itemsPerPage;
  const currentBills = filteredBills.slice(indexOfFirstBill, indexOfLastBill);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleReStoreOut = async (bill) => {
    try {
      setLoading(true);
      
      // Check if this bill already has a status document
      let statusDocId;
      let isNewStatus = false;
      
      if (billStoreStatus[bill.id]) {
        statusDocId = billStoreStatus[bill.id].id;
      } else {
        isNewStatus = true;
      }
      
      // Update product stock quantities (decrease)
      const productUpdates = [];
      
      for (const option of bill.productOptions) {
        // Find the product in our products array
        const product = products.find(p => p.id === option.productId);
        if (!product) continue;
        
        // Find the matching option in the product
        const productOption = product.options?.find(po => 
          (po.name && option.optionId && po.name.toString() === option.optionId.toString()) || 
          (po.name && po.name.toString() === option.optionName)
        );
        
        if (!productOption) continue;
        
        // Calculate new stock value
        const currentStock = Number(productOption.stock || 0);
        const qtyToRemove = Number(option.qty || 0);
        const newStock = Math.max(0, currentStock - qtyToRemove);
        
        // Update the product option's stock in Firestore
        const productDoc = doc(db, "Product", option.productId);
        const productSnapshot = await getDoc(productDoc);
        
        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();
          const updatedOptions = productData.productOptions.map(po => {
            if ((po.name && option.optionId && po.name.toString() === option.optionId.toString()) || 
                (po.name && po.name.toString() === option.optionName)) {
              return { ...po, stock: newStock };
            }
            return po;
          });
          
          productUpdates.push(updateDoc(productDoc, { productOptions: updatedOptions }));
        }
      }
      
      // Execute all product updates
      await Promise.all(productUpdates);
      
      // Update or create the status document
      if (isNewStatus) {
        // Create a new status document
        const statusRef = await addDoc(billStoreStatusCollectionRef, {
          billId: bill.id,
          isStoredOut: true,
          isStoredIn: false,
          storedOutAt: serverTimestamp(),
          storedInAt: null
        });
        
        // Update local state
        setBillStoreStatus(prev => ({
          ...prev,
          [bill.id]: {
            id: statusRef.id,
            isStoredOut: true,
            isStoredIn: false
          }
        }));
      } else {
        // Update existing status document
        const statusRef = doc(db, "BillStoreStatus", statusDocId);
        await updateDoc(statusRef, {
          isStoredOut: true,
          isStoredIn: false,
          storedOutAt: serverTimestamp(),
          storedInAt: null
        });
        
        // Update local state
        setBillStoreStatus(prev => ({
          ...prev,
          [bill.id]: {
            ...prev[bill.id],
            isStoredOut: true,
            isStoredIn: false
          }
        }));
      }
      
      alert("Re Store-Out completed successfully!");
      
      // Refresh products to get updated stock values
      await fetchProducts();
    } catch (error) {
      console.error("Error during Re Store-Out:", error.message);
      alert("Error during Re Store-Out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReStoreIn = async (bill) => {
    try {
      setLoading(true);
      
      // Get the status document
      const statusDocId = billStoreStatus[bill.id]?.id;
      if (!statusDocId) {
        throw new Error("Status document not found");
      }
      
      // Update product stock quantities (increase)
      const productUpdates = [];
      
      for (const option of bill.productOptions) {
        // Find the product in our products array
        const product = products.find(p => p.id === option.productId);
        if (!product) continue;
        
        // Find the matching option in the product
        const productOption = product.options?.find(po => 
          (po.name && option.optionId && po.name.toString() === option.optionId.toString()) || 
          (po.name && po.name.toString() === option.optionName)
        );
        
        if (!productOption) continue;
        
        // Calculate new stock value
        const currentStock = Number(productOption.stock || 0);
        const qtyToAdd = Number(option.qty || 0);
        const newStock = currentStock + qtyToAdd;
        
        // Update the product option's stock in Firestore
        const productDoc = doc(db, "Product", option.productId);
        const productSnapshot = await getDoc(productDoc);
        
        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();
          const updatedOptions = productData.productOptions.map(po => {
            if ((po.name && option.optionId && po.name.toString() === option.optionId.toString()) || 
                (po.name && po.name.toString() === option.optionName)) {
              return { ...po, stock: newStock };
            }
            return po;
          });
          
          productUpdates.push(updateDoc(productDoc, { productOptions: updatedOptions }));
        }
      }
      
      // Execute all product updates
      await Promise.all(productUpdates);
      
      // Update the status document
      const statusRef = doc(db, "BillStoreStatus", statusDocId);
      await updateDoc(statusRef, {
        isStoredOut: true,
        isStoredIn: true,
        storedInAt: serverTimestamp()
      });
      
      // Update local state
      setBillStoreStatus(prev => ({
        ...prev,
        [bill.id]: {
          ...prev[bill.id],
          isStoredOut: true,
          isStoredIn: true
        }
      }));
      
      alert("Re Store-In completed successfully!");
      
      // Refresh products to get updated stock values
      await fetchProducts();
    } catch (error) {
      console.error("Error during Re Store-In:", error.message);
      alert("Error during Re Store-In. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const triggerPrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 300);
  };

  const handleDownloadPDF = () => {
    const printContent = document.querySelector('.print-content');
    const originalContents = document.body.innerHTML;
    
    document.body.innerHTML = printContent.innerHTML;
    
    window.print();
    
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const handlePrintBill = (bill) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${bill.billNo}</title>
          <style>
            @page {
              size: A4;
              margin: 0;
            }
            body {
              font-family: 'Courier New', monospace;
              margin: 0;
              padding: 0;
              color: black;
              background-color: white;
            }
            .invoice-container {
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
              padding: 10px;
              position: relative;
              overflow: hidden;
            }
            .background-pattern {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0.03;
              z-index: -1;
              background-image: repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%);
              background-size: 10px 10px;
              pointer-events: none;
            }
            .invoice-header {
              text-align: center;
              margin-bottom: 20px;
              position: relative;
            }
            .invoice-badge {
              position: absolute;
              top: 10px;
              right: 10px;
              font-size: 18px;
              font-weight: bold;
              padding: 8px 12px;
              border: 3px double black;
              transform: rotate(5deg);
            }
            .company-title {
              font-size: 36px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 3px;
              margin: 0;
              line-height: 1.2;
              text-shadow: 1px 1px 0 white;
            }
            .company-details {
              font-size: 14px;
              margin: 5px 0;
            }
            .invoice-number {
              font-size: 20px;
              font-weight: bold;
              margin: 15px 0 5px;
              padding: 5px;
              border-top: 1px solid black;
              border-bottom: 1px solid black;
              display: inline-block;
            }
            .customer-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
              margin-bottom: 20px;
              border: 1px solid black;
              padding: 15px;
            }
            .grid-title {
              grid-column: 1/-1;
              font-size: 18px;
              font-weight: bold;
              text-transform: uppercase;
              border-bottom: 1px dashed black;
              padding-bottom: 5px;
              margin-bottom: 10px;
            }
            .grid-section {
              margin-bottom: 10px;
            }
            .grid-label {
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 3px;
            }
            .grid-value {
              font-size: 16px;
              margin-bottom: 10px;
            }
            .invoice-banner {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin: 15px 0;
              padding: 10px 15px;
              background-color: white;
              border: 1px solid black;
              position: relative;
            }
            .banner-text {
              font-size: 20px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .payment-methods {
              display: flex;
              gap: 15px;
            }
            .payment-method {
              display: flex;
              align-items: center;
            }
            .method-checkbox {
              width: 15px;
              height: 15px;
              border: 1px solid black;
              margin-right: 5px;
              display: inline-block;
            }
            .method-label {
              font-size: 14px;
            }
            .corner-accent {
              position: absolute;
              font-size: 20px;
              line-height: 1;
            }
            .corner-top-left {
              top: 5px;
              left: 5px;
            }
            .corner-top-right {
              top: 5px;
              right: 5px;
            }
            .corner-bottom-left {
              bottom: 5px;
              left: 5px;
            }
            .corner-bottom-right {
              bottom: 5px;
              right: 5px;
            }
            .product-section {
              margin-bottom: 20px;
              border: 1px solid black;
            }
            .section-header {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 5px 0;
              position: relative;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              text-transform: uppercase;
              padding: 0 15px;
              background-color: white;
              position: relative;
              z-index: 1;
            }
            .header-line {
              position: absolute;
              top: 50%;
              left: 0;
              right: 0;
              height: 1px;
              background-color: black;
              z-index: 0;
            }
            .product-table {
              width: 100%;
              border-collapse: collapse;
            }
            .product-table th {
              border-top: 1px solid black;
              border-bottom: 1px solid black;
              font-size: 14px;
              font-weight: bold;
              text-align: left;
              padding: 8px 10px;
              text-transform: uppercase;
            }
            .product-table td {
              border-bottom: 1px dashed black;
              font-size: 15px;
              padding: 8px 10px;
            }
            .product-table tr:last-child td {
              border-bottom: none;
            }
            .discounts-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 10px;
              margin-bottom: 20px;
            }
            .discount-card {
              border: 1px solid black;
              padding: 10px;
            }
            .discount-title {
              font-size: 16px;
              font-weight: bold;
              text-align: center;
              border-bottom: 1px dashed black;
              padding-bottom: 5px;
              margin-bottom: 10px;
              text-transform: uppercase;
            }
            .discount-content {
              font-size: 14px;
              min-height: 60px;
            }
            .discount-footer {
              font-size: 15px;
              font-weight: bold;
              text-align: right;
              padding-top: 5px;
              border-top: 1px dashed black;
            }
            .summary-block {
              width: 60%;
              margin-left: auto;
              margin-bottom: 20px;
              border: 1px solid black;
              padding: 10px;
            }
            .summary-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 5px;
            }
            .summary-row:last-child {
              margin-bottom: 0;
              border-top: 1px solid black;
              padding-top: 5px;
            }
            .summary-label {
              font-size: 15px;
              font-weight: bold;
            }
            .summary-value {
              font-size: 15px;
              text-align: right;
            }
            .grand-total {
              font-size: 18px;
              font-weight: bold;
            }
            .signature-row {
              display: flex;
              justify-content: space-between;
              margin-top: 30px;
              margin-bottom: 20px;
            }
            .signature-field {
              width: 45%;
            }
            .signature-line {
              border-top: 1px solid black;
              padding-top: 5px;
              font-size: 14px;
              text-transform: uppercase;
              text-align: center;
            }
            .invoice-footer {
              text-align: center;
              margin-top: 20px;
              padding-top: 10px;
              border-top: 1px solid black;
              position: relative;
            }
            .thank-you {
              font-size: 18px;
              font-weight: bold;
              text-transform: uppercase;
              margin-bottom: 5px;
            }
            .terms {
              font-size: 12px;
              margin-bottom: 10px;
            }
            .serial {
              position: absolute;
              bottom: 10px;
              right: 10px;
              font-size: 10px;
              font-family: "Courier New", monospace;
              border: 1px solid black;
              padding: 2px 5px;
            }
            .border-accent {
              position: absolute;
              height: 50px;
              width: 50px;
              border: 3px solid black;
              z-index: -1;
            }
            .accent-top-left {
              top: -15px;
              left: -15px;
              border-right: none;
              border-bottom: none;
            }
            .accent-top-right {
              top: -15px;
              right: -15px;
              border-left: none;
              border-bottom: none;
            }
            .accent-bottom-left {
              bottom: -15px;
              left: -15px;
              border-right: none;
              border-top: none;
            }
            .accent-bottom-right {
              bottom: -15px;
              right: -15px;
              border-left: none;
              border-top: none;
            }
            .print-controls {
              text-align: center;
              margin-top: 20px;
            }
            .print-button {
              padding: 10px 20px;
              font-size: 16px;
              cursor: pointer;
              background-color: black;
              color: white;
              border: none;
              margin-right: 10px;
            }
            .close-button {
              padding: 10px 20px;
              font-size: 16px;
              cursor: pointer;
              background-color: #333;
              color: white;
              border: none;
            }
            @media print {
              .no-print { display: none; }
              .invoice-container {
                padding: 0;
              }
              body * {
                color: black !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="background-pattern"></div>
            <div class="border-accent accent-top-left"></div>
            <div class="border-accent accent-top-right"></div>
            <div class="border-accent accent-bottom-left"></div>
            <div class="border-accent accent-bottom-right"></div>
            
            <div class="invoice-header">
              <div class="invoice-badge">OFFICIAL COPY</div>
              <div class="company-title">ADVANCE TRADING</div>
              <div class="company-details">No: 170/A, Nuwaraeliya Rd, Delpitiya, Gampola | Tel: 072-7070701</div>
              <div class="invoice-number">INVOICE #${bill.billNo || 'N/A'}</div>
            </div>
            
            <div class="customer-grid">
              <div class="grid-title">CUSTOMER DETAILS</div>
              <div class="grid-section">
                <div class="grid-label">CUSTOMER:</div>
                <div class="grid-value">${bill.outletName || 'N/A'}</div>
                
                <div class="grid-label">ADDRESS:</div>
                <div class="grid-value">${bill.address || 'N/A'}</div>
                
                <div class="grid-label">CONTACT:</div>
                <div class="grid-value">${bill.contact || 'N/A'}</div>
              </div>
              
              <div class="grid-section">
                <div class="grid-label">DATE:</div>
                <div class="grid-value">${bill.createDate || 'N/A'}</div>
                
                <div class="grid-label">SALES REF:</div>
                <div class="grid-value">${bill.salesRef || 'N/A'}</div>
                
                <div class="grid-label">REF CONTACT:</div>
                <div class="grid-value">${bill.refContact || 'N/A'}</div>
              </div>
            </div>
            
            <div class="invoice-banner">
              <div class="corner-accent corner-top-left">●</div>
              <div class="corner-accent corner-top-right">●</div>
              <div class="corner-accent corner-bottom-left">●</div>
              <div class="corner-accent corner-bottom-right">●</div>
              
              <div class="banner-text">Payment Method</div>
              <div class="payment-methods">
                <div class="payment-method">
                  <div class="method-checkbox"></div>
                  <div class="method-label">CASH</div>
                </div>
                <div class="payment-method">
                  <div class="method-checkbox"></div>
                  <div class="method-label">CREDIT</div>
                </div>
                <div class="payment-method">
                  <div class="method-checkbox"></div>
                  <div class="method-label">CHEQUE</div>
                </div>
              </div>
            </div>
            
            <div class="product-section">
              <div class="section-header">
                <div class="header-line"></div>
                <div class="section-title">PRODUCT DETAILS</div>
              </div>
              <table class="product-table">
                <thead>
                  <tr>
                    <th style="width: 40%;">DESCRIPTION</th>
                    <th style="width: 15%; text-align: center;">QUANTITY</th>
                    <th style="width: 15%; text-align: right;">UNIT PRICE</th>
                    <th style="width: 15%; text-align: right;">MARGIN</th>
                    <th style="width: 15%; text-align: right;">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  ${bill.productOptions.map(option => `
                    <tr>
                      <td>${products.find(p => p.id === option.productId)?.name || 'N/A'} ${option.optionId}</td>
                      <td style="text-align: center;">${option.qty || '0'}</td>
                      <td style="text-align: right;">${option.price || '0.00'}</td>
                      <td style="text-align: right;">${(() => {
                        // Get margin from the option, or calculate it
                        const price = parseFloat(option.price) || 0;
                        const dbPrice = parseFloat(option.dbPrice) || 0;
                        
                        // Return 0.00 if either price is missing or 0
                        if (!price || !dbPrice) {
                          return "0.00";
                        }
                        
                        // Use existing margin or calculate from prices
                        const margin = parseFloat(option.margin) || (price - dbPrice) || 0;
                        
                        return margin.toFixed(2);
                      })()}</td>
                      <td style="text-align: right;">${((parseFloat(option.price) || 0) * (parseFloat(option.qty) || 0)).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="4" style="text-align: right; font-weight: bold;">TOTAL:</td>
                    <td style="text-align: right; font-weight: bold;">${calculateProductTotal(bill.productOptions)}</td>
                  </tr>
                  <tr>
                    <td colspan="3" style="text-align: right; font-weight: bold;">TOTAL MARGIN:</td>
                    <td colspan="2" style="text-align: right; font-weight: bold; color: #ff9800;">Rs. ${(() => {
                      // Make sure we have a valid number for the total margin
                      if (!bill.productOptions || bill.productOptions.length === 0) return "0.00";
                      
                      const totalMargin = bill.productOptions.reduce((sum, option) => {
                        // Get margin from the option, or calculate it
                        const price = parseFloat(option.price) || 0;
                        const dbPrice = parseFloat(option.dbPrice) || 0;
                        const qty = parseFloat(option.qty) || 0;
                        
                        // Skip this item if either price is missing or 0
                        if (!price || !dbPrice) {
                          return sum;
                        }
                        
                        // Use existing margin or calculate from prices
                        const margin = parseFloat(option.margin) || (price - dbPrice) || 0;
                        
                        return sum + (margin * qty);
                      }, 0);
                      
                      return totalMargin.toFixed(2);
                    })()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div class="section-header">
              <div class="header-line"></div>
              <div class="section-title">ADJUSTMENTS</div>
            </div>
            
            <div class="discounts-grid">
              <div class="discount-card">
                <div class="discount-title">Discount</div>
                <div class="discount-content">
                  ${bill.discountOptions && bill.discountOptions.length > 0 ? bill.discountOptions.map(option => `
                    ${option.name}: ${option.case} × ${option.perCaseRate} = ${option.total || '0.00'}<br>
                  `).join('') : 'None'}
                </div>
                <div class="discount-footer">Total: Rs. ${calculateTotal(bill.discountOptions || [])}</div>
              </div>
              
              <div class="discount-card">
                <div class="discount-title">Free Issue</div>
                <div class="discount-content">
                  ${bill.freeIssueOptions && bill.freeIssueOptions.length > 0 ? bill.freeIssueOptions.map(option => `
                    ${option.name}: ${option.case} × ${option.perCaseRate} = ${option.total || '0.00'}<br>
                  `).join('') : 'None'}
                </div>
                <div class="discount-footer">Total: Rs. ${calculateTotal(bill.freeIssueOptions || [])}</div>
              </div>
              
              <div class="discount-card">
                <div class="discount-title">Expire</div>
                <div class="discount-content">
                  ${bill.expireOptions && bill.expireOptions.length > 0 ? bill.expireOptions.map(option => `
                    ${option.name}: ${option.case} × ${option.perCaseRate} = ${option.total || '0.00'}<br>
                  `).join('') : 'None'}
                </div>
                <div class="discount-footer">Total: Rs. ${calculateTotal(bill.expireOptions || [])}</div>
              </div>
            </div>
            
            <div class="summary-block">
              <div class="summary-row">
                <div class="summary-label">SUBTOTAL:</div>
                <div class="summary-value">Rs. ${calculateProductTotal(bill.productOptions)}</div>
              </div>
              <div class="summary-row">
                <div class="summary-label">TOTAL MARGIN:</div>
                <div class="summary-value" style="color: #ff9800; font-weight: bold;">Rs. ${(() => {
                  // Make sure we have a valid number for the total margin
                  if (!bill.productOptions || bill.productOptions.length === 0) return "0.00";
                  
                  const totalMargin = bill.productOptions.reduce((sum, option) => {
                    // Get margin from the option, or calculate it
                    const price = parseFloat(option.price) || 0;
                    const dbPrice = parseFloat(option.dbPrice) || 0;
                    const qty = parseFloat(option.qty) || 0;
                    
                    // Skip this item if either price is missing or 0
                    if (!price || !dbPrice) {
                      return sum;
                    }
                    
                    // Use existing margin or calculate from prices
                    const margin = parseFloat(option.margin) || (price - dbPrice) || 0;
                    
                    return sum + (margin * qty);
                  }, 0);
                  
                  return totalMargin.toFixed(2);
                })()}</div>
              </div>
              <div class="summary-row">
                <div class="summary-label">DISCOUNT:</div>
                <div class="summary-value">Rs. ${calculateTotal(bill.discountOptions || [])}</div>
              </div>
              <div class="summary-row">
                <div class="summary-label">FREE ISSUE:</div>
                <div class="summary-value">Rs. ${calculateTotal(bill.freeIssueOptions || [])}</div>
              </div>
              <div class="summary-row">
                <div class="summary-label">EXPIRE:</div>
                <div class="summary-value">Rs. ${calculateTotal(bill.expireOptions || [])}</div>
              </div>
              <div class="summary-row">
                <div class="summary-label grand-total">GRAND TOTAL:</div>
                <div class="summary-value grand-total">Rs. ${(
                  parseFloat(calculateProductTotal(bill.productOptions)) -
                  (parseFloat(calculateTotal(bill.discountOptions || [])) +
                   parseFloat(calculateTotal(bill.freeIssueOptions || [])) +
                   parseFloat(calculateTotal(bill.expireOptions || [])))
                ).toFixed(2)}</div>
              </div>
            </div>
            
            <div class="signature-row">
              <div class="signature-field">
                <div class="signature-line">Customer Signature</div>
              </div>
              <div class="signature-field">
                <div class="signature-line">Authorized Signature</div>
              </div>
            </div>
            
            <div class="invoice-footer">
              <div class="thank-you">Thank You For Your Business</div>
              <div class="terms">All goods are sold as per our standard terms and conditions. 
              Please examine all goods upon receipt and notify us within 24 hours of any discrepancies.</div>
              <div class="serial">SN: ${bill.billNo || 'N/A'}-${new Date().getFullYear()}</div>
            </div>
          </div>
          
          <div class="print-controls no-print">
            <button onclick="window.print()" class="print-button">Print Invoice</button>
            <button onclick="window.close()" class="close-button">Close</button>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Create a helper function to calculate unit margin to use in multiple places
  const calculateUnitMargin = (unit) => {
    console.log("Calculating margin for unit:", unit.unitId);
    
    // Direct margin accessor - if unit has a precalculated total margin
    if (unit.totalMargin !== undefined && unit.totalMargin !== null) {
      console.log(`Using pre-calculated total margin: ${unit.totalMargin}`);
      return parseFloat(unit.totalMargin) || 0;
    }
    
    // Calculate the total margin across all bills in this unit
    if (!unit.bills || unit.bills.length === 0) {
      console.log("No bills found in unit, returning 0");
      return 0;
    }
    
    console.log(`Found ${unit.bills.length} bills in unit`);
    
    const totalMargin = unit.bills.reduce((unitSum, bill) => {
      console.log("Processing bill:", bill.billNo || "Unknown");
      
      // Handle case where bill has a precalculated margin
      if (bill.totalMargin !== undefined && bill.totalMargin !== null) {
        const margin = parseFloat(bill.totalMargin) || 0;
        console.log(`Using pre-calculated bill margin: ${margin}`);
        return unitSum + margin;
      }
      
      // Check if this is a bill from the database or our own format
      // When bills come from Firebase, they have 'productOptions'
      // When bills are in the processed unit, they have 'products'
      const productList = bill.products || bill.productOptions || [];
      
      if (!productList || productList.length === 0) {
        console.log("No products found in bill, skipping");
        return unitSum;
      }
      
      console.log(`Found ${productList.length} products in bill`);
      
      const billMargin = productList.reduce((billSum, product) => {
        // Get margin from the product, or calculate it
        const price = parseFloat(product.price) || 0;
        const dbPrice = parseFloat(product.dbPrice) || 0;
        const qty = parseFloat(product.qty) || 0;
        
        console.log(`Product: Price=${price}, DBPrice=${dbPrice}, Qty=${qty}`);
        
        // Skip if either price is missing or 0
        if (!price || !dbPrice) {
          console.log("Missing price data, skipping product");
          return billSum;
        }
        
        // Use existing margin or calculate from prices
        const productMargin = parseFloat(product.margin) || (price - dbPrice) || 0;
        const totalProductMargin = productMargin * qty;
        
        console.log(`Calculated margin: ${productMargin}, Total: ${totalProductMargin}`);
        
        return billSum + totalProductMargin;
      }, 0);
      
      console.log(`Bill total margin: ${billMargin}`);
      
      return unitSum + billMargin;
    }, 0);
    
    console.log(`Unit total margin: ${totalMargin}`);
    
    return totalMargin;
  };

  // Create a helper function to calculate bill margin
  const calculateBillMargin = (bill) => {
    console.log("Calculating margin for bill:", bill.billNo || "Unknown");
    
    // Check if this is a bill from the database or our own format
    // When bills come from Firebase, they have 'productOptions'
    // When bills are in the processed unit, they have 'products'
    const productList = bill.products || bill.productOptions || [];
    
    if (!productList || productList.length === 0) {
      console.log("No products found in bill, returning 0");
      return 0;
    }
    
    console.log(`Found ${productList.length} products in bill`);
    
    return productList.reduce((sum, product) => {
      const price = parseFloat(product.price) || 0;
      const dbPrice = parseFloat(product.dbPrice) || 0;
      const qty = parseFloat(product.qty) || 0;
      
      console.log(`Product: Price=${price}, DBPrice=${dbPrice}, Qty=${qty}`);
      
      // Skip if either price is missing or 0
      if (!price || !dbPrice) {
        console.log("Missing price data, skipping product");
        return sum;
      }
      
      // Use existing margin or calculate from prices
      const productMargin = parseFloat(product.margin) || (price - dbPrice) || 0;
      const totalProductMargin = productMargin * qty;
      
      console.log(`Calculated margin: ${productMargin}, Total: ${totalProductMargin}`);
      
      return sum + totalProductMargin;
    }, 0);
  };

  return (
    <div className="container">
      <h3>Bill Management</h3>

      {/* Available Bills Section */}
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>Available Bills</h4>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
          <div style={{ width: "250px" }}>
            <select 
              className="form-select" 
              value={creatorFilter} 
              onChange={handleCreatorFilterChange}
              aria-label="Filter by creator"
            >
              <option value="">All Creators</option>
              {creators.map((creator, index) => (
                <option key={index} value={creator}>{creator}</option>
              ))}
            </select>
          </div>
          <div style={{ position: "relative", width: "300px" }}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search bills..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={{ paddingLeft: "40px" }}
            />
            <i
              className="bi bi-search"
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#888"
              }}
            ></i>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Bill No</th>
              <th>Outlet Name</th>
              <th>Sales Ref</th>
              <th>Ref Contact</th>
              <th>Create Date</th>
              <th>Total Margin (Rs.)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBills.map((bill) => (
              <tr key={bill.id}>
                <td>{bill.billNo}</td>
                <td>{bill.outletName}</td>
                <td>{bill.salesRef}</td>
                <td>{bill.refContact}</td>
                <td>{bill.createDate}</td>
                <td style={{ fontWeight: "bold", color: "#ff9800" }}>
                  Rs. {(() => {
                    // Make sure we have a valid number for the total margin
                    if (!bill.productOptions || bill.productOptions.length === 0) return "0.00";
                    
                    const totalMargin = bill.productOptions.reduce((sum, option) => {
                      // Get margin from the option, or calculate it
                      const price = parseFloat(option.price) || 0;
                      const dbPrice = parseFloat(option.dbPrice) || 0;
                      const qty = parseFloat(option.qty) || 0;
                      
                      // Skip this item if either price is missing or 0
                      if (!price || !dbPrice) {
                        return sum;
                      }
                      
                      // Use existing margin or calculate from prices
                      const margin = parseFloat(option.margin) || (price - dbPrice) || 0;
                      
                      return sum + (margin * qty);
                    }, 0);
                    
                    return totalMargin.toFixed(2);
                  })()}
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-info btn-sm" onClick={() => handleViewBill(bill)}>View</button>
                    <button className="btn btn-success btn-sm" onClick={() => handleAddToNewBill(bill)}>Add</button>
                    <button 
                      className="btn btn-danger btn-sm" 
                      onClick={() => handleReStoreOut(bill)}
                      disabled={loading || (billStoreStatus[bill.id]?.isStoredOut && !billStoreStatus[bill.id]?.isStoredIn)}
                    >
                      Out
                    </button>
                    <button 
                      className="btn btn-sm" 
                      style={{ backgroundColor: "darkgreen", color: "white" }}
                      onClick={() => handleReStoreIn(bill)}
                      disabled={loading || !billStoreStatus[bill.id]?.isStoredOut || billStoreStatus[bill.id]?.isStoredIn}
                    >
                     In
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-center">
          <nav className="mt-3">
            <div className="d-flex align-items-center justify-content-center">
              <ul className="pagination mb-0" style={{ maxWidth: '100%', overflowX: 'auto', display: 'flex', margin: '0 10px' }}>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} style={{ minWidth: 'fit-content' }}>
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ borderRadius: '4px 0 0 4px' }}
                  >
                    Previous
                  </button>
                </li>
                <div style={{ 
                  display: 'flex', 
                  overflowX: 'auto',
                  maxWidth: 'calc(100% - 200px)', // Adjust based on Previous/Next button widths
                  margin: '0',
                  WebkitOverflowScrolling: 'touch',
                  msOverflowStyle: '-ms-autohiding-scrollbar'
                }}>
                  {Array.from({ length: Math.ceil(filteredBills.length / itemsPerPage) }).map((_, index) => {
                    // Show 15 page numbers at a time
                    const pageNumber = index + 1;
                    const startPage = Math.max(1, currentPage - 7);
                    const endPage = Math.min(Math.ceil(filteredBills.length / itemsPerPage), startPage + 14);
                    
                    if (pageNumber >= startPage && pageNumber <= endPage) {
                      return (
                        <li
                          key={index}
                          className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
                          style={{ minWidth: 'fit-content' }}
                        >
                          <button 
                            className="page-link" 
                            onClick={() => paginate(pageNumber)}
                            style={{ margin: '0', borderRadius: '0' }}
                          >
                            {pageNumber}
                          </button>
                        </li>
                      );
                    }
                    return null;
                  })}
                </div>
                <li
                  className={`page-item ${
                    currentPage === Math.ceil(filteredBills.length / itemsPerPage) ? 'disabled' : ''
                  }`}
                  style={{ minWidth: 'fit-content' }}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(filteredBills.length / itemsPerPage)}
                    style={{ borderRadius: '0 4px 4px 0' }}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/* Process New Bills Section */}
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>Process New Bills</h4>
        <div className="row mb-3">
          <div className="col-md-4">
            <label>Select Date: </label>
            <input 
              type="date" 
              className="form-control" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label>Driver Name: </label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter driver name"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label>Route: </label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter route"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
            />
          </div>
        </div>

        {/* Display added bills as cards */}
        <div className="mb-3">
          <h5>Added Bills:</h5>
          <div className="d-flex flex-wrap gap-2">
            {newBillItems.map((item, billIndex) => (
              <div key={billIndex} className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h6 className="card-title">{item.billNo}</h6>
                  <p className="card-text">{item.outletName}</p>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => handleDeleteItem(billIndex)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {newBillItems.length > 0 && (
          <div>
            <h5>Process Products</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Qty (BT)</th>
                  <th>Bottles per Case</th>
                  <th>Case</th>
                  <th>Extra Bottles</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(
                  newBillItems.flatMap(item => 
                    item.products.map(product => ({
                      productId: product.productId,
                      optionId: product.optionId,
                      product: product,
                      billIndex: newBillItems.indexOf(item),
                      productIndex: item.products.indexOf(product),
                      productName: products.find(p => p.id === product.productId)?.name || 'Unknown'
                    }))
                  ).reduce((acc, curr) => {
                    if (!acc[curr.optionId]) {
                      acc[curr.optionId] = [];
                    }
                    acc[curr.optionId].push(curr);
                    return acc;
                  }, {})
                )
                // Sort by optionId and put WATER products last
                .sort(([optionIdA, entriesA], [optionIdB, entriesB]) => {
                  const isWaterA = entriesA[0].productName === "WATER";
                  const isWaterB = entriesB[0].productName === "WATER";
                  
                  if (isWaterA && !isWaterB) return 1;
                  if (!isWaterA && isWaterB) return -1;
                  
                  // Extract ML value and convert to number for comparison
                  const getML = (str) => parseInt(str.match(/\d+/)?.[0] || 0);
                  return getML(optionIdA) - getML(optionIdB);
                })
                .flatMap(([optionId, optionEntries], optionGroupIndex, optionGroups) => {
                  const productGroups = optionEntries.reduce((acc, entry) => {
                    if (!acc[entry.productId]) {
                      acc[entry.productId] = [];
                    }
                    acc[entry.productId].push(entry);
                    return acc;
                  }, {});

                  const optionRows = Object.entries(productGroups).map(([productId, entries], productIndex) => {
                    const totalQty = entries.reduce((sum, entry) => {
                      return sum + (parseInt(entry.product.qty) || 0);
                    }, 0);

                    const firstEntry = entries[0];
                    const firstInstance = firstEntry.product;
                    const billIndex = firstEntry.billIndex;
                    const entryProductIndex = firstEntry.productIndex;
                    const productName = firstEntry.productName;
                    const uniqueKey = `${productId}-${optionId}`;

                    return (
                      <tr key={uniqueKey}>
                        <td>{productName} - {optionId}</td>
                        <td>{totalQty}</td>
                        <td>
                          <div className="form-check form-check-inline" style={{ marginRight: '15px' }}>
                            <input
                              type="radio"
                              name={`bpc-${uniqueKey}`}
                              value={9}
                              checked={firstInstance.bottlesPerCase === 9}
                              onChange={() => {
                                if (billIndex !== -1 && entryProductIndex !== -1) {
                                  handleBottlesPerCaseChange(billIndex, entryProductIndex, 9);
                                }
                              }}
                              style={{
                                width: '18px',
                                height: '18px',
                                margin: '0 6px 0 0',
                                cursor: 'pointer',
                                accentColor: '#007bff'
                              }}
                            />
                            <label style={{ 
                              fontSize: '14px', 
                              cursor: 'pointer',
                              userSelect: 'none',
                              fontWeight: '500'
                            }}>9</label>
                          </div>
                          <div className="form-check form-check-inline" style={{ marginRight: '15px' }}>
                            <input
                              type="radio"
                              name={`bpc-${uniqueKey}`}
                              value={12}
                              checked={firstInstance.bottlesPerCase === 12}
                              onChange={() => {
                                if (billIndex !== -1 && entryProductIndex !== -1) {
                                  handleBottlesPerCaseChange(billIndex, entryProductIndex, 12);
                                }
                              }}
                              style={{
                                width: '18px',
                                height: '18px',
                                margin: '0 6px 0 0',
                                cursor: 'pointer',
                                accentColor: '#007bff'
                              }}
                            />
                            <label style={{ 
                              fontSize: '14px', 
                              cursor: 'pointer',
                              userSelect: 'none',
                              fontWeight: '500'
                            }}>12</label>
                          </div>
                          <div className="form-check form-check-inline" style={{ marginRight: '15px' }}>
                            <input
                              type="radio"
                              name={`bpc-${uniqueKey}`}
                              value={15}
                              checked={firstInstance.bottlesPerCase === 15}
                              onChange={() => {
                                if (billIndex !== -1 && entryProductIndex !== -1) {
                                  handleBottlesPerCaseChange(billIndex, entryProductIndex, 15);
                                }
                              }}
                              style={{
                                width: '18px',
                                height: '18px',
                                margin: '0 6px 0 0',
                                cursor: 'pointer',
                                accentColor: '#007bff'
                              }}
                            />
                            <label style={{ 
                              fontSize: '14px', 
                              cursor: 'pointer',
                              userSelect: 'none',
                              fontWeight: '500'
                            }}>15</label>
                          </div>
                          <div className="form-check form-check-inline" style={{ marginRight: '15px' }}>
                            <input
                              type="radio"
                              name={`bpc-${uniqueKey}`}
                              value={24}
                              checked={firstInstance.bottlesPerCase === 24}
                              onChange={() => {
                                if (billIndex !== -1 && entryProductIndex !== -1) {
                                  handleBottlesPerCaseChange(billIndex, entryProductIndex, 24);
                                }
                              }}
                              style={{
                                width: '18px',
                                height: '18px',
                                margin: '0 6px 0 0',
                                cursor: 'pointer',
                                accentColor: '#007bff'
                              }}
                            />
                            <label style={{ 
                              fontSize: '14px', 
                              cursor: 'pointer',
                              userSelect: 'none',
                              fontWeight: '500'
                            }}>24</label>
                          </div>
                          <div className="form-check form-check-inline" style={{ marginRight: '15px' }}>
                            <input
                              type="radio"
                              name={`bpc-${uniqueKey}`}
                              value={30}
                              checked={firstInstance.bottlesPerCase === 30}
                              onChange={() => {
                                if (billIndex !== -1 && entryProductIndex !== -1) {
                                  handleBottlesPerCaseChange(billIndex, entryProductIndex, 30);
                                }
                              }}
                              style={{
                                width: '18px',
                                height: '18px',
                                margin: '0 6px 0 0',
                                cursor: 'pointer',
                                accentColor: '#007bff'
                              }}
                            />
                            <label style={{ 
                              fontSize: '14px', 
                              cursor: 'pointer',
                              userSelect: 'none',
                              fontWeight: '500'
                            }}>30</label>
                          </div>
                        </td>
                        <td>{firstInstance.bottlesPerCase ? Math.floor(totalQty / firstInstance.bottlesPerCase) : '-'}</td>
                        <td>{firstInstance.bottlesPerCase ? totalQty % firstInstance.bottlesPerCase : '-'}</td>
                      </tr>
                    );
                  });

                  if (optionGroupIndex < Object.keys(optionGroups).length - 1) {
                    return [
                      ...optionRows,
                      <tr key={`separator-${optionId}`} style={{ height: "20px", backgroundColor: "#f8f9fa" }}>
                        <td colSpan="5"></td>
                      </tr>
                    ];
                  }
                  
                  return optionRows;
                })}
              </tbody>
            </table>
          </div>
        )}

        {newBillItems.length > 0 && (
          <div className="text-center">
            <button 
              className="btn btn-primary" 
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save All"}
            </button>
          </div>
        )}
      </div>

      {/* Processed Units History */}
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
        <h4>Processed Units History</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Unit ID</th>
              <th>Date</th>
              <th>Driver Name</th>
              <th>Route</th>
              <th>Total Margin (Rs.)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {processedUnits.map((unit) => (
              <tr key={unit.id}>
                <td>{unit.unitId}</td>
                <td>{unit.date}</td>
                <td>{unit.driverName || 'N/A'}</td>
                <td>{unit.route || 'N/A'}</td>
                <td style={{ fontWeight: "bold", color: "#ff9800" }}>
                  Rs. {calculateUnitMargin(unit).toFixed(2)}
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-info btn-sm" 
                      onClick={() => handleViewProcessedUnit(unit)}
                    >
                      <i className="bi bi-eye"></i> View
                    </button>
                    <button 
                      className="btn btn-warning btn-sm" 
                      onClick={() => handleEditProcessedUnit(unit)}
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </button>
                    <button 
                      className="btn btn-danger btn-sm" 
                      onClick={() => handleDeleteProcessedUnit(unit.id)}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                    <button 
                      className="btn btn-success btn-sm" 
                      onClick={() => handlePrintUnit(unit)}
                    >
                      <i className="bi bi-printer"></i> Print
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Modal for View Bill/Unit */}
      {selectedBill && !printMode && (
        <div className="modal" style={{ display: "block", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-content" style={{ backgroundColor: "#fff", margin: "5% auto", padding: "20px", width: "80%", maxWidth: "800px", borderRadius: "8px", maxHeight: "80vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #ddd", paddingBottom: "10px" }}>
              <h4>{selectedBill.unitId ? `Unit Details - ${selectedBill.unitId}` : `Bill Details - ${selectedBill.billNo}`}</h4>
              <div className="d-flex gap-2">
                {selectedBill.unitId && (
                  <button className="btn btn-success" onClick={() => handlePrintUnit(selectedBill)}>
                    <i className="bi bi-printer"></i> Print
                  </button>
                )}
                <button className="btn btn-danger" onClick={handleClosePopup}>
                  <i className="bi bi-x-circle"></i> Close
                </button>
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              {selectedBill.unitId ? (
                // View for Processed Unit
                <>
                  <p><strong>Date:</strong> {selectedBill.date}</p>
                  <p><strong>Total Margin:</strong> <span style={{ fontWeight: "bold", color: "#ff9800" }}>Rs. {calculateUnitMargin(selectedBill).toFixed(2)}</span></p>
                  
                  <h5>Consolidated Products</h5>
                  <table className="table table-bordered" style={{ color: "#000000", borderColor: "#000000" }}>
                    <thead>
                      <tr>
                        <th style={{ color: "#000000", borderColor: "#000000" }}>Option</th>
                        <th style={{ color: "#000000", borderColor: "#000000" }}>Product Name</th>
                        <th style={{ color: "#000000", borderColor: "#000000" }}>Qty (BT)</th>
                        <th style={{ color: "#000000", borderColor: "#000000" }}>Bottles/Case</th>
                        <th style={{ color: "#000000", borderColor: "#000000" }}>Case</th>
                        <th style={{ color: "#000000", borderColor: "#000000" }}>Extra Bottles</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Group consolidated products by optionId */}
                      {(selectedBill.consolidatedProducts || [])
                        .sort((a, b) => a.optionId.localeCompare(b.optionId))
                        .reduce((result, product, index, array) => {
                          // Add the current product to the result
                          result.push(
                            <tr key={`product-${index}`}>
                              <td style={{ color: "#000000", borderColor: "#000000" }}>{product.optionId}</td>
                              <td style={{ color: "#000000", borderColor: "#000000" }}>{product.productName || products.find(p => p.id === product.productId)?.name}</td>
                              <td style={{ color: "#000000", borderColor: "#000000" }}>{product.totalQty}</td>
                              <td style={{ color: "#000000", borderColor: "#000000" }}>{product.bottlesPerCase || '-'}</td>
                              <td style={{ color: "#000000", borderColor: "#000000" }}>{product.caseCount || '-'}</td>
                              <td style={{ color: "#000000", borderColor: "#000000" }}>{product.extraBottles || '-'}</td>
                            </tr>
                          );
                          
                          // If the next product has a different optionId, add a separator row
                          if (index < array.length - 1 && product.optionId !== array[index + 1].optionId) {
                            result.push(
                              <tr key={`separator-${index}`} style={{ height: "20px", backgroundColor: "#f8f9fa", borderColor: "#000000" }}>
                                <td colSpan="6" style={{ borderColor: "#000000" }}></td>
                              </tr>
                            );
                          }
                          
                          return result;
                        }, [])
                      }
                    </tbody>
                  </table>
                  
                  <h5>Added Bills</h5>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {selectedBill.bills.map((bill, idx) => (
                      <div key={idx} className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                          <h6 className="card-title">{bill.billNo}</h6>
                          <p className="card-text">{bill.outletName}</p>
                          <p className="card-text" style={{ fontWeight: "bold", color: "#ff9800" }}>
                            Margin: Rs. {calculateBillMargin(bill).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <h5>Bill Details</h5>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Bill No</th>
                        <th>Outlet Name</th>
                        <th>Total Margin (Rs.)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBill.bills.map((bill, idx) => (
                        <tr key={idx}>
                          <td>{bill.billNo}</td>
                          <td>{bill.outletName}</td>
                          <td style={{ fontWeight: "bold", color: "#ff9800" }}>
                            Rs. {calculateBillMargin(bill).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="2" style={{ textAlign: "right", fontWeight: "bold" }}>Total Margin:</td>
                        <td style={{ fontWeight: "bold", color: "#ff9800" }}>
                          Rs. {calculateUnitMargin(selectedBill).toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                  
                  <h5>Consolidated Products</h5>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Option</th>
                        <th>Product Name</th>
                        <th>Qty (BT)</th>
                        <th>Bottles/Case</th>
                        <th>Case</th>
                        <th>Extra Bottles</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Group consolidated products by optionId */}
                      {(selectedBill.consolidatedProducts || [])
                        .sort((a, b) => a.optionId.localeCompare(b.optionId))
                        .reduce((result, product, index, array) => {
                          // Add the current product to the result
                          result.push(
                            <tr key={`product-${index}`}>
                              <td>{product.optionId}</td>
                              <td>{product.productName || products.find(p => p.id === product.productId)?.name}</td>
                              <td>{product.totalQty}</td>
                              <td>{product.bottlesPerCase || '-'}</td>
                              <td>{product.caseCount || '-'}</td>
                              <td>{product.extraBottles || '-'}</td>
                            </tr>
                          );
                          
                          // If the next product has a different optionId, add a separator row
                          if (index < array.length - 1 && product.optionId !== array[index + 1].optionId) {
                            result.push(
                              <tr key={`separator-${index}`} style={{ height: "20px", backgroundColor: "#f8f9fa" }}>
                                <td colSpan="6"></td>
                              </tr>
                            );
                          }
                          
                          return result;
                        }, [])
                      }
                    </tbody>
                  </table>
                </>
              ) : (
                // View for Available Bill
                <>
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>Outlet Name:</strong> {selectedBill.outletName}</p>
                      <p><strong>Address:</strong> {selectedBill.address}</p>
                      <p><strong>Contact:</strong> {selectedBill.contact}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Sales Ref:</strong> {selectedBill.salesRef}</p>
                      <p><strong>Ref Contact:</strong> {selectedBill.refContact}</p>
                      <p><strong>Create Date:</strong> {selectedBill.createDate}</p>
                    </div>
                  </div>

                  <h5>Product Options</h5>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price (Rs.)</th>
                        <th>Quantity</th>
                        <th>Margin (Rs.)</th>
                        <th>Total Price (Rs.)</th>
                        <th>Total Margin (Rs.)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBill.productOptions.map((option, idx) => (
                        <tr key={idx}>
                          <td>{products.find(p => p.id === option.productId)?.name} - {option.optionId}</td>
                          <td>Rs. {option.price}</td>
                          <td>{option.qty}</td>
                          <td style={{ fontWeight: "bold", color: "#ff9800" }}>Rs. {(() => {
                            // Get margin from the option, or calculate it
                            const price = parseFloat(option.price) || 0;
                            const dbPrice = parseFloat(option.dbPrice) || 0;
                            
                            // Return 0.00 if either price is missing or 0
                            if (!price || !dbPrice) {
                              return "0.00";
                            }
                            
                            // Use existing margin or calculate from prices
                            const margin = parseFloat(option.margin) || (price - dbPrice) || 0;
                            
                            return margin.toFixed(2);
                          })()}</td>
                          <td>Rs. {((parseFloat(option.price) || 0) * (parseFloat(option.qty) || 0)).toFixed(2)}</td>
                          <td style={{ fontWeight: "bold", color: "#ff9800" }}>Rs. {(() => {
                            // Get margin from the option, or calculate it
                            const price = parseFloat(option.price) || 0;
                            const dbPrice = parseFloat(option.dbPrice) || 0;
                            const qty = parseFloat(option.qty) || 0;
                            
                            // Return 0.00 if either price is missing or 0
                            if (!price || !dbPrice) {
                              return "0.00";
                            }
                            
                            // Use existing margin or calculate from prices
                            const margin = parseFloat(option.margin) || (price - dbPrice) || 0;
                            
                            return (margin * qty).toFixed(2);
                          })()}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="4" style={{ textAlign: "right", fontWeight: "bold" }}>Total:</td>
                        <td>Rs. {calculateProductTotal(selectedBill.productOptions)}</td>
                        <td style={{ fontWeight: "bold", color: "#ff9800" }}>Rs. {(() => {
                          // Make sure we have a valid number for the total margin
                          if (!selectedBill.productOptions || selectedBill.productOptions.length === 0) return "0.00";
                          
                          const totalMargin = selectedBill.productOptions.reduce((sum, option) => {
                            // Get margin from the option, or calculate it
                            const price = parseFloat(option.price) || 0;
                            const dbPrice = parseFloat(option.dbPrice) || 0;
                            const qty = parseFloat(option.qty) || 0;
                            
                            // Skip this item if either price is missing or 0
                            if (!price || !dbPrice) {
                              return sum;
                            }
                            
                            // Use existing margin or calculate from prices
                            const margin = parseFloat(option.margin) || (price - dbPrice) || 0;
                            
                            return sum + (margin * qty);
                          }, 0);
                          
                          return totalMargin.toFixed(2);
                        })()}</td>
                      </tr>
                    </tfoot>
                  </table>

                  {selectedBill.discountOptions?.length > 0 && (
                    <>
                      <h5>Discount Options</h5>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Option Name</th>
                            <th>Case</th>
                            <th>Per Case Rate</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedBill.discountOptions.map((option, idx) => (
                            <tr key={idx}>
                              <td>{option.name}</td>
                              <td>{option.case}</td>
                              <td>{option.perCaseRate}</td>
                              <td>{option.total}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>Total:</td>
                            <td>Rs. {calculateTotal(selectedBill.discountOptions)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </>
                  )}

                  {selectedBill.freeIssueOptions?.length > 0 && (
                    <>
                      <h5>Free Issue Options</h5>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Option Name</th>
                            <th>Case</th>
                            <th>Per Case Rate</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedBill.freeIssueOptions.map((option, idx) => (
                            <tr key={idx}>
                              <td>{option.name}</td>
                              <td>{option.case}</td>
                              <td>{option.perCaseRate}</td>
                              <td>{option.total}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>Total:</td>
                            <td>Rs. {calculateTotal(selectedBill.freeIssueOptions)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </>
                  )}

                  {selectedBill.expireOptions?.length > 0 && (
                    <>
                      <h5>Expire Options</h5>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Option Name</th>
                            <th>Case</th>
                            <th>Per Case Rate</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedBill.expireOptions.map((option, idx) => (
                            <tr key={idx}>
                              <td>{option.name}</td>
                              <td>{option.case}</td>
                              <td>{option.perCaseRate}</td>
                              <td>{option.total}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>Total:</td>
                            <td>Rs. {calculateTotal(selectedBill.expireOptions)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Print Popup Modal */}
      {selectedBill && printMode && (
        <div className="modal" style={{ display: "block", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-content" style={{ backgroundColor: "#fff", margin: "5% auto", padding: "20px", width: "90%", maxWidth: "800px", borderRadius: "8px", maxHeight: "80vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #ddd", paddingBottom: "10px", marginBottom: "20px" }} className="no-print">
              <h4>Print Unit - {selectedBill.unitId}</h4>
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-primary" 
                  onClick={triggerPrint}
                  disabled={isPrinting}
                >
                  <i className="bi bi-printer"></i> {isPrinting ? "Printing..." : "Print"}
                </button>
                <button 
                  className="btn btn-success" 
                  onClick={handleDownloadPDF}
                  disabled={isPrinting}
                >
                  <i className="bi bi-file-earmark-pdf"></i> Download PDF
                </button>
                <button className="btn btn-danger" onClick={handleClosePopup}>
                  <i className="bi bi-x-circle"></i> Close
                </button>
              </div>
            </div>
            
            <div className="print-content" style={{ marginTop: "20px" }}>
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                {/* <h2 style={{ margin: "0" }}>Advance Trading</h2> */}
                {/* <p style={{ margin: "3px 0" }}>Reg Office: No: 170/A, Nuwaraeliya Rd, Delpitiya, Gampola</p>
                <p style={{ margin: "2px 0" }}>Tel: 072-7070701</p> */}
                <h3 style={{ margin: "8px 0" }}>Loading Sheet</h3>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <div>
                  <p><strong  style={{ color: 'black' }}>Unit ID:</strong> <span style={{ color: 'black' }}>{selectedBill.unitId}</span></p>
                  <p><strong  style={{ color: 'black' }}>Driver:</strong> <span style={{ color: 'black' }}>{selectedBill.driverName || 'N/A'}</span></p>
                </div>
                <div>
                  <p><strong  style={{ color: 'black' }}>Date:</strong> <span style={{ color: 'black' }}>{selectedBill.date}</span></p>
                  <p><strong  style={{ color: 'black' }}>Route:</strong> <span style={{ color: 'black' }}>{selectedBill.route || 'N/A'}</span></p>
                </div>
              </div>
              
              <h5 style={{ borderBottom: "1px solid #000", paddingBottom: "3px", marginBottom: "3px" }}>Consolidated Products</h5>
              <table className="table table-bordered" style={{ marginBottom: "5px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f2f2f2",color: 'black',borderColor: 'black' }}>
                    <th>Option</th>
                    <th>Product Name</th>
                    <th>Qty</th>
                    <th>Bottle/Case</th>
                    <th>Case</th>
                    <th>Extra</th>
                  </tr>
                </thead>
                <tbody  style={{ color: 'black',borderColor: 'black' }}>
                  {/* Group consolidated products by optionId */}
                  {(selectedBill.consolidatedProducts || [])
                    .sort((a, b) => {
                      // Extract the numeric part at the beginning of optionId
                      const numA = parseInt(a.optionId.match(/^\d+/) || [0]);
                      const numB = parseInt(b.optionId.match(/^\d+/) || [0]);
                      return numA - numB;
                    })
                    .reduce((result, product, index, array) => {
                      // Add the current product to the result
                      result.push(
                        <tr key={`product-${index}`} style={{ lineHeight: "1" }}>
                          <td>{product.optionId}</td>
                          <td>{product.productName || products.find(p => p.id === product.productId)?.name}</td>
                          <td>{product.totalQty}</td>
                          <td>{product.bottlesPerCase || '-'}</td>
                          <td>{product.caseCount || '-'}</td>
                          <td>{product.extraBottles || '-'}</td>
                        </tr>
                      );
                      
                      // If the next product has a different optionId, add a separator row
                      if (index < array.length - 1 && product.optionId !== array[index + 1].optionId) {
                        result.push(
                          <tr key={`separator-${index}`} style={{ height: "2px", backgroundColor: "#f0f0f0" }} className="separator-row">
                            <td colSpan="6"></td>
                          </tr>
                        );
                      }
                      
                      return result;
                    }, [])
                  }
                </tbody>
                <tfoot>
                  <tr style={{ color: 'black',borderColor: 'black' }}>
                    <td colSpan="4" style={{ textAlign: "right",color: 'black' }}>Total Cases:</td>
                    <td style={{ color: 'black' }}>
                      {(selectedBill.consolidatedProducts || []).reduce((sum, product) => {
                        return sum + (parseInt(product.caseCount) || 0);
                      }, 0)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
              <br /> <br /> <br />
              <div style={{ marginTop: "8px", display: "flex", justifyContent: "space-between",color: 'black',borderColor: 'black' }}>
                <div style={{ width: "30%", borderTop: "0.5px solid #000", textAlign: "center", paddingTop: "2px" }}>
                  <p style={{ margin: 0 }}>Prepared By</p>
                </div>
                <div style={{ width: "30%", borderTop: "0.5px solid #000", textAlign: "center", paddingTop: "2px" }}>
                  <p style={{ margin: 0 }}>Checked By</p>
                </div>
                <div style={{ width: "30%", borderTop: "0.5px solid #000", textAlign: "center", paddingTop: "2px" }}>
                  <p style={{ margin: 0 }}>Approved By</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-content, .print-content * {
              visibility: visible;
            }
            .no-print {
              display: none;
            }
            .print-content {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 5px;
              font-size: 8px;
              color: #000000 !important;
            }
            .print-content h2 {
              font-size: 14px;
              margin: 0;
              color: #000000 !important;
            }
            .print-content h3 {
              font-size: 12px;
              margin: 5px 0;
              color: #000000 !important;
            }
            .print-content h5 {
              font-size: 10px;
              margin: 5px 0 2px;
              padding-bottom: 3px !important;
              color: #000000 !important;
              border-bottom: 1.5px solid #000 !important;
            }
            .print-content p {
              margin: 1px 0;
              font-size: 8px;
              color: #000000 !important;
            }
            @page {
              size: A4;
              margin: 5mm 3mm;
            }
            table {
              border-collapse: collapse;
              width: 100%;
              margin-bottom: 5px;
              border: 1.5px solid #000 !important;
            }
            table, th, td {
              border: 1.5px solid #000 !important;
              color: #000000 !important;
            }
            th, td {
              padding: 1px 2px;
              text-align: left;
              font-size: 7px;
              white-space: nowrap;
              color: #000000 !important;
            }
            tr {
              height: auto;
              line-height: 1.1;
              color: #000000 !important;
            }
            .print-content .table-bordered {
              margin-bottom: 5px;
              border: 1.5px solid #000 !important;
            }
            .separator-row {
              height: 2px !important;
            }
            tfoot {
              border-top: 1.5px solid #000 !important;
            }
            tfoot tr td {
              border-top: 1.5px solid #000 !important;
              font-size: 8px;
              color: #000000 !important;
            }
            .print-content > div:last-child {
              margin-top: 10px !important;
            }
            .print-content > div:last-child > div {
              padding-top: 2px !important;
              border-top: 1.5px solid #000 !important;
            }
            .print-content > div:last-child p {
              margin: 0;
              color: #000000 !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BillManagement;