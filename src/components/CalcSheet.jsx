import React, { useState } from "react";

//Material List
export const CalcSheet = () => {
  const [data, setData] = useState([
    { id: 1, material: "Arrowhead of Desire", value: 160, amount: 0 },
    { id: 2, material: "Empress's Mask", value: 3000, amount: 0 },
    { id: 3, material: "Hellish Bowtie", value: 150, amount: 0 },
    { id: 4, material: "Hushing Tiara", value: 130, amount: 0 },
    { id: 5, material: "Mask of Cruelty", value: 120, amount: 0 },
    { id: 6, material: "Shackles of Ecstasy", value: 200, amount: 0 },
    { id: 7, material: "Thebel Crystal", value: 1000, amount: 0 },
    { id: 8, material: "Thebel Glass Shard", value: 70, amount: 0 },
    { id: 9, material: "Thebel Iron Fence", value: 105, amount: 0 },
    { id: 10, material: "Thebel Lantern", value: 140, amount: 0 },
    { id: 11, material: "Thebel Stone Piece", value: 80, amount: 0 },
    { id: 12, material: "Vanguard's Horn", value: 220, amount: 0 },
    { id: 13, material: "Wealth Coin", value: 3000, amount: 0 },
  ]);

  //Change amount of material
  const handleAmountChange = (id, newAmount) => {
    setData((prevData) =>
      prevData.map((material) =>
        material.id === id ? { ...material, amount: newAmount } : material
      )
    );
  };

  //Value of the amount of a certain material
  const calculateSubtotal = (value, amount) => {
    return value * amount;
  };

  //Total value of all materials
  const total = data.reduce(
    (sum, material) => sum + calculateSubtotal(material.value, material.amount),
    0
  );

  return (
    <div color="">
      <h2>Material Calculation Sheet</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{border: '1px solid'}}>Material</th>
            <th style={{border: '1px solid'}}>Value</th>
            <th style={{border: '1px solid'}}>Amount</th>
            <th style={{border: '1px solid'}}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {data.map((material) => (
            <tr key={material.id}>
              <td style={{border: '1px solid'}}>{material.material}</td>
              <td style={{border: '1px solid'}}>{material.value}</td>
              <td style={{border: '1px solid'}}>
                <input //Changes in the amount of material
                  type="number"
                  min={0}
                  step={1}
                  value={material.amount}
                  onChange={(e) =>
                    handleAmountChange(
                      material.id,
                      parseInt(e.target.value) || 0
                    )
                  }
                  style={{ width: "80px" }}
                />
              </td>
              <td style={{border: '1px solid'}}>{calculateSubtotal(material.value, material.amount)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} style={{ textAlign: "right", fontWeight: "bold" }}>
              Total:
            </td>
            <td style={{ fontWeight: "bold" }}>{total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
