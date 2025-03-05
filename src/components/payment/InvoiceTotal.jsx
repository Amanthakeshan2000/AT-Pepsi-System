import React from "react";

const InvoiceTotal = () => {
  return (
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-4 col-12 mb-3 d-flex">
          <div class="card p-3 flex-fill shadow">
            <h6>Overdue</h6>
            <h4>Rs0.00 LKR</h4>
            <small>
              Last updated just a moment ago. <a href="#">&#x21bb;</a>
            </small>
          </div>
        </div>
        <div class="col-md-4 col-12 mb-3 d-flex">
          <div class="card p-3 flex-fill shadow">
            <h6>Due within next 30 days</h6>
            <h4>Rs569,250.00 LKR</h4>
          </div>
        </div>
        <div class="col-md-4 col-12 mb-3 d-flex">
          <div class="card p-3 flex-fill shadow">
            <h6>Average time to get paid</h6>
            <h4>4 days</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTotal;
