import React, { useState, useEffect } from "react";
import MaterialsData from "./MaterialsData";

const LOCAL_STORAGE_KEY = "material_amounts";

//Material List
export const CalcSheet = () => {
  const [data, setData] = useState(
    MaterialsData.map((material) => ({ ...material, amount: "" }))
  );

  const [hasLoaded, setHasLoaded] = useState(false); //Previene escritura

  useEffect(() => {
  let storedAmounts = {};
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      storedAmounts = JSON.parse(stored);
    }
  } catch (error) {
    console.warn("Failed to parse localStorage data:", error);
    localStorage.removeItem(LOCAL_STORAGE_KEY); // prevent recurring issues
  }

  const initialData = MaterialsData.map((material) => ({
    ...material,
    amount: storedAmounts[material.id] ?? "",
  }));

  setData(initialData);
  setHasLoaded(true);
}, []);

  useEffect(() => {
    if (!hasLoaded) return;

    const amountsToSave = {};
    data.forEach((material) => {
      amountsToSave[material.id] = material.amount;
    });

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(amountsToSave));
  }, [data, hasLoaded]);


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
    const materialAmount = parseFloat(amount);
    return value * (isNaN(materialAmount) ? 0 : materialAmount);
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
            <th style={{ border: "1px solid" }}>Material</th>
            <th style={{ border: "1px solid" }}>Value</th>
            <th style={{ border: "1px solid" }}>Amount</th>
            <th style={{ border: "1px solid" }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {data.map((material) => (
            <tr key={material.id}>
              <td style={{ border: "1px solid" }}>{material.material}</td>
              <td style={{ border: "1px solid" }}>{material.value}</td>
              <td style={{ border: "1px solid" }}>
                <input //Changes in the amount of material
                  type="number"
                  value={material.amount}
                  onChange={(e) =>
                    handleAmountChange(material.id, e.target.value)
                  }
                  min={0}
                  style={{ width: "80px" }}
                />
              </td>
              <td style={{ border: "1px solid" }}>
                ¥{calculateSubtotal(material.value, material.amount)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} style={{ textAlign: "right", fontWeight: "bold" }}>
              Total:
            </td>
            <td style={{ fontWeight: "bold" }}>¥{total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
