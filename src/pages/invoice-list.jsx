import InvoiceTotal from "@/components/payment/InvoiceTotal";
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import PaymentHeader from "@/components/payment/PaymentHeader";
import PaymentTable from "@/components/payment/InvoiceTable";
import React from "react";

const InvoiceList = () => {
  return (
    <>
      <PageHeader>
        <PaymentHeader />
      </PageHeader>
      <div className="main-content">
        <div className="row">
          <InvoiceTotal />
          <PaymentTable />
        </div>
      </div>
    </>
  );
};

export default InvoiceList;
