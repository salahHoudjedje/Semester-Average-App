import React, { useState } from "react";
import "./CalcultPage.css";

const CalcultPage = () => {
  const models = [
    { name: "النظريات المعاصرة في علم الاجتماع", coefficient: 3 },
    { name: "علم الاجتماع المؤسسات", coefficient: 2 },
    { name: "سوسيولوجيا الرابط الاجتماعي", coefficient: 2 },
    { name: "ملتقى التدريب على البحث الاجتماعي", coefficient: 2 },
    { name: "الدراسات المؤسسة في علم الاجتماع", coefficient: 2 },
    { name: "الحوكمة وأخلاقية المهنة", coefficient: 1 },
    { name: "تحليل ومعالجة المعطيات الاجتماعي", coefficient: 2 },
    { name: "العلم والأخلاق", coefficient: 1, hasCourseOnly: true },
    { name: "اللغة الانجليزية", coefficient: 1, hasTDOnly: true },
  ];

  const [points, setPoints] = useState(
    models.map(() => ({ td: "", course: "" })) // Initialize points for TD and Course for each model
  );

  const [semesterAverage, setSemesterAverage] = useState(null);
  const [note01, setNote01] = useState("");
  const [note02, setNote02] = useState("");

  const handleInputChange = (index, field, value) => {
    const updatedPoints = [...points];
    updatedPoints[index][field] = value;
    setPoints(updatedPoints);
  };

  const calculateSemesterAverage = () => {
    let totalPoints = 0;
    let totalCoefficients = 0;

    models.forEach((model, index) => {
      const td = model.hasCourseOnly ? 0 : parseFloat(points[index].td) || 0;
      const course = model.hasTDOnly ? 0 : parseFloat(points[index].course) || 0;
      const average = model.hasCourseOnly
        ? course
        : model.hasTDOnly
        ? td
        : td * 0.4 + course * 0.6;

      totalPoints += average * model.coefficient;
      totalCoefficients += model.coefficient;
    });

    const semesterAvg = totalPoints / totalCoefficients;
    setSemesterAverage(semesterAvg);

    const targetTotalPoints = totalCoefficients * 10; // Points needed for a 10/20 average
    const pointsNeeded = Math.max(0, targetTotalPoints - totalPoints);

    let additionalNote = "";
    if (semesterAvg < 10) {
      const requiredNextSemesterAverage = 20 - semesterAvg; // Calculate needed average in the second semester
      additionalNote = `Note 02: You need to achieve an average of at least ${requiredNextSemesterAverage.toFixed(
        2
      )} in the second semester to pass with an overall average of 10/20.`;
      setNote02(additionalNote);
    } else {
      setNote02("Note 02: Congratulations! You have achieved a semester average of 10/20 or higher.");
    }

    setNote01(
      semesterAvg < 10
        ? `Note 01: Your semester average is below 10/20. You need at least ${pointsNeeded.toFixed(
            2
          )} more points to reach a 10/20 average.`
        : `Note 01: Congratulations! You have achieved a semester average of 10/20 or higher.`
    );
  };

  const resetInputs = () => {
    setPoints(models.map(() => ({ td: "", course: "" }))); // Reset points
    setSemesterAverage(null); // Clear semester average
    setNote01(""); // Clear the first note
    setNote02(""); // Clear the second note
  };

  return (
    <div className="calcult-page">
      <h1 className="title">Semester Average Calculator</h1>
      <table className="models-table">
        <thead>
          <tr>
            <th>المقياس</th>
            <th>المعامل</th>
            <th>TD</th>
            <th>Cour</th>
            <th>معدل المقياس</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model, index) => {
            const td = model.hasCourseOnly ? 0 : parseFloat(points[index].td) || 0;
            const course = model.hasTDOnly ? 0 : parseFloat(points[index].course) || 0;
            const average = model.hasCourseOnly
              ? course
              : model.hasTDOnly
              ? td
              : td * 0.4 + course * 0.6;

            return (
              <tr key={index}>
                <td>{model.name}</td>
                <td>{model.coefficient}</td>
                <td>
                  {!model.hasCourseOnly && (
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={points[index].td}
                      onChange={(e) =>
                        handleInputChange(index, "td", e.target.value)
                      }
                      className="input-box"
                    />
                  )}
                </td>
                <td>
                  {!model.hasTDOnly && (
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={points[index].course}
                      onChange={(e) =>
                        handleInputChange(index, "course", e.target.value)
                      }
                      className="input-box"
                    />
                  )}
                </td>
                <td>{average.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{models.reduce((sum, model) => sum + model.coefficient, 0)}</td>
            <td colSpan="3">
              {semesterAverage !== null
                ? `Semester Average: ${semesterAverage.toFixed(2)} / 20`
                : "N/A"}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="buttons-container">
        <button onClick={calculateSemesterAverage} className="calculate-button">
          Calculate Semester Average
        </button>
        <button onClick={resetInputs} className="reset-button">
          Reset
        </button>
      </div>
      {note01 && (
        <div className="note">
          <p>{note01}</p>
          <br />
          <p>{note02}</p>
        </div>
      )}
    </div>
  );
};

export default CalcultPage;