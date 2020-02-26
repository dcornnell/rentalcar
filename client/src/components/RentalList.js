import React from "react";
import m from "moment";
function RentalList({ rentals }) {
  console.log(rentals);
  return (
    <table className="table">
      <thread className="align">
        <tr>
          <th scope="col">Date Rented</th>
          <th scope="col">Date Returned</th>
          <th scope="col">Total Days</th>
          <th scope="col">Miles</th>
          <th scope="col">Price Per Day</th>
          <th scope="col">Total Price</th>
          <th scope="col">Vat Price</th>
        </tr>
      </thread>
      <tbody>
        {rentals
          ? rentals.map(rental => {
              return (
                <tr>
                  <td>{m(rental.start_date).format("MM/DD/YYYY")}</td>
                  <td>{m(rental.end_date).format("MM/DD/YYYY")}</td>
                  <td>{rental.days}</td>
                  <td>{rental.miles}</td>
                  <td>{rental.price}</td>
                  <td>{rental.total_price}</td>
                  <td>{rental.vat_price}</td>
                </tr>
              );
            })
          : ""}
      </tbody>
    </table>
  );
}

export default RentalList;
