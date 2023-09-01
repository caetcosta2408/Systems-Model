    const tbody = document.querySelector("tbody");
    const month_year = document.querySelector("#month_year");
    const amount = document.querySelector("#amount");
    const type = document.querySelector("#type");
    const btnNew = document.querySelector("#btnNew");

    const capital = document.querySelector(".capital");
    const interest_rate = document.querySelector(".interest_rate");
    const total = document.querySelector(".total");

    let items;

    btnNew.onclick = () => {
      if (month_year.value === "" || amount.value === "" || type.value === "") {
        return alert("Please, type Month/Year and Amount...");
      }
      items.push({
        month_year: month_year.value,
        amount: Math.abs(amount.value).toFixed(2),
        type: type.value,
      });
      setItensBD();
      loadItens();
      month_year.value = "";
      amount.value = "";
    };

    function deleteItem(index) {
      items.splice(index, 1);
      setItensBD();
      loadItens();
    }

    function insertItem(item, index) {
      let tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${item.month_year}</td>
        <td>R$ ${item.amount}</td>
        <td class="columnType">${
          item.type === "Enter"
            ? 'Enter'
            : 'Interest Rate'
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
      const amountIncomes = items.filter((item) => item.type === "Enter").map((transaction) => Number(transaction.amount));

      const amountInterest = items.filter((item) => item.type === "Interest Rate").map((transaction) => Number(transaction.amount));

      const totalIncomes = amountIncomes.reduce((acc, cur) => acc + cur, 0).toFixed(2);

      const totalInterest = Math.abs(amountInterest.reduce((acc, cur) => acc + cur, 0)).toFixed(2);

      const calcInterest = ((totalIncomes * totalInterest) / 100).toFixed(2);
      const totalItems = eval(totalIncomes + "+" +calcInterest).toFixed(2);

      capital.innerHTML = totalIncomes;
      interest_rate.innerHTML = totalInterest;
      total.innerHTML = totalItems;
    }

    const getItensBD = () => JSON.parse(localStorage.getItem("db_Investment")) ?? [];
    const setItensBD = () => localStorage.setItem("db_Investment", JSON.stringify(items));

    loadItens();