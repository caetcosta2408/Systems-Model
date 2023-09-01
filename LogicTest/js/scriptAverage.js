    const tbody = document.querySelector("tbody");
    const student = document.querySelector("#student");
    const subject = document.querySelector("#subject");

    const grd1 = document.querySelector("#grd1");
    const grd2 = document.querySelector("#grd2");
    const grd3 = document.querySelector("#grd3");
    const grd4 = document.querySelector("#grd4");

    const type = document.querySelector("#type");
    const btnNew = document.querySelector("#btnNew");

    const grade1 = document.querySelector(".grade1");
    const grade2 = document.querySelector(".grade2");
    const grade3 = document.querySelector(".grade3");
    const grade4 = document.querySelector(".grade4");

    const score = document.querySelector(".score");
    const average = document.querySelector(".average");

    let items;

    btnNew.onclick = () => {
      if (student.value === "" || subject.value === "" || grd1.value === "" || grd2.value === "" || grd3.value === "" || grd4.value === "" || type.value === "") {
        return alert("Please, type the Student, Subject and Grade...");
      }
      items.push({
        subject: subject.value,
        student: student.value,

        grd1: Math.abs(grd1.value).toFixed(2),
        grd2: Math.abs(grd2.value).toFixed(2),
        grd3: Math.abs(grd3.value).toFixed(2),
        grd4: Math.abs(grd4.value).toFixed(2),

        type: type.value,
      });
      setItensBD();
      loadItens();
      student.value = "";
      subject.value = "";
      
      grd1.value = "";
      grd2.value = "";
      grd3.value = "";
      grd4.value = "";
    };

    function deleteItem(index) {
      items.splice(index, 1);
      setItensBD();
      loadItens();
    }

    function insertItem(item, index) {
      let tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${item.student}</td>
        <td>${item.subject}</td>
        
        <td>${item.grd1}</td>
        <td>${item.grd2}</td>
        <td>${item.grd3}</td>
        <td>${item.grd4}</td>

        <td class="columnType">${
          item.type === "Enter"
            ? 'Enter'
            : 'Score'
        }</td>
        <td class="columnAction">
          <button onclick="deleteItem(${index})">Delete</button>
        </td>
      `;

      tbody.appendChild(tr);
    }

    function loadItens() {
      items = getItensBD();
      tbody.innerHTML = "";
      items.forEach((item, index) => {
        insertItem(item, index);
      });
      getTotals();
    }

    function getTotals() {
      const grd1Incomes = items.filter((item) => item.type === "Enter").map((transaction) => Number(transaction.grd1));
      const grd2Incomes = items.filter((item) => item.type === "Enter").map((transaction) => Number(transaction.grd2));
      const grd3Incomes = items.filter((item) => item.type === "Enter").map((transaction) => Number(transaction.grd3));
      const grd4Incomes = items.filter((item) => item.type === "Enter").map((transaction) => Number(transaction.grd4));

      const scoreGrd1 = items.filter((item) => item.type === "Score").map((transaction) => Number(transaction.grd1));
      const scoreGrd2 = items.filter((item) => item.type === "Score").map((transaction) => Number(transaction.grd2));
      const scoreGrd3 = items.filter((item) => item.type === "Score").map((transaction) => Number(transaction.grd3));
      const scoreGrd4 = items.filter((item) => item.type === "Score").map((transaction) => Number(transaction.grd4));

      const totalIncomes1 = grd1Incomes.reduce((acc, cur) => acc + cur, 0).toFixed(2);
      const totalIncomes2 = grd2Incomes.reduce((acc, cur) => acc + cur, 0).toFixed(2);
      const totalIncomes3 = grd3Incomes.reduce((acc, cur) => acc + cur, 0).toFixed(2);
      const totalIncomes4 = grd4Incomes.reduce((acc, cur) => acc + cur, 0).toFixed(2);

      const totalScore1 = Math.abs(scoreGrd1.reduce((acc, cur) => acc + cur, 0)).toFixed(2);
      const totalScore2 = Math.abs(scoreGrd2.reduce((acc, cur) => acc + cur, 0)).toFixed(2);
      const totalScore3 = Math.abs(scoreGrd3.reduce((acc, cur) => acc + cur, 0)).toFixed(2);
      const totalScore4 = Math.abs(scoreGrd4.reduce((acc, cur) => acc + cur, 0)).toFixed(2);

      const totalItems1 = (totalIncomes1 - totalScore1).toFixed(2);
      const totalItems2 = (totalIncomes2 - totalScore2).toFixed(2);
      const totalItems3 = (totalIncomes3 - totalScore3).toFixed(2);
      const totalItems4 = (totalIncomes4 - totalScore4).toFixed(2);

      grade1.innerHTML = totalIncomes1;
      grade2.innerHTML = totalIncomes2;
      grade3.innerHTML = totalIncomes3;
      grade4.innerHTML = totalIncomes4;

      const sumScore = totalScore1+"+"+totalScore2+"+"+totalScore3+"+"+totalScore4;
      score.innerHTML = eval(sumScore).toFixed(2);

	    const calcAverage = "(("+totalIncomes1+"+"+totalIncomes2+"+"+totalIncomes3+"+"+totalIncomes4+")"+"/4"+")+"+sumScore
	    average.innerHTML = eval(calcAverage).toFixed(2);
    }

    const getItensBD = () => JSON.parse(localStorage.getItem("db_Average")) ?? [];
    const setItensBD = () => localStorage.setItem("db_Average", JSON.stringify(items));

    loadItens();