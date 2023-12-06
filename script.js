var current_page;
var first = 1;
async function readTextFile(page) {
  document.getElementById("nextpage").hidden = false;
  if (page != 1) {
    document.getElementById("prevpage").hidden = false;
  } else {
    first = 1;
    document.getElementById("prevpage").hidden = true;
  }

  table_output = "";
  current_page = page;
  var records_per_page = 15;
  var reader = new FileReader();
  var url = "Sint-Genesius-Rode_Kiezerslijst_200610088.xls";
  let blob = await fetch(url).then((r) => r.blob());
  reader.readAsArrayBuffer(blob);

  reader.onload = function (event) {
    var data = new Uint8Array(reader.result);

    var work_book = XLSX.read(data, { type: "array" });

    var sheet_name = work_book.SheetNames;

    var sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], {
      header: 1,
    });

    if (sheet_data.length > 0) {
      var table_output = '<table class="table table-striped table-bordered">';
      console.log(current_page * records_per_page + 2);
      for (var row = 0; row < current_page * records_per_page + 1; row++) {
        if (current_page != 1) {
          for (var cell = 0; cell < sheet_data[row].length; cell++) {
            if (
              cell != 0 &&
              cell != 2 &&
              cell != 8 &&
              cell != 9 &&
              cell != 10
            ) {
              if (row == 0) {
                table_output += "<th>" + sheet_data[row][cell] + "</th>";
              } else {
                console.log(sheet_data[row][cell]);
                console.log(sheet_data[row]);
                console.log(sheet_data);

                table_output += "<td>" + sheet_data[row][cell] + "</td>";
              }
            }
          }
        }

        for (
          var row = (current_page - 1) * records_per_page;
          row < current_page * records_per_page + first;
          row++
        ) {
          table_output += "<tr>";

          for (var cell = 0; cell < sheet_data[row].length; cell++) {
            if (
              cell != 0 &&
              cell != 2 &&
              cell != 8 &&
              cell != 9 &&
              cell != 10
            ) {
              if (row == 0) {
                table_output += "<th>" + sheet_data[row][cell] + "</th>";
              } else {
                table_output += "<td>" + sheet_data[row][cell] + "</td>";
              }
            }
          }
          table_output += "</tr>";
        }
        first = 0;
      }
      table_output += "</table>";

      document.getElementById("excel_data").innerHTML = table_output;
    }
  };
}

function nextPage(page) {
  page = current_page + 1;
  readTextFile(page);
}
function prevPage(page) {
  page = current_page - 1;
  readTextFile(page);
}
async function readTextFileWithParam() {
  var found = false;
  document.getElementById("niets").hidden = true;
  var element = document.getElementById("input");
  if (element.value != null && element.value != "") {
    document.getElementById("nextpage").hidden = true;
    document.getElementById("prevpage").hidden = true;
    document.getElementById("niets").hidden = true;
    var input = element.value;
    console.log(input);
    var reader = new FileReader();
    var url = "Sint-Genesius-Rode_Kiezerslijst_200610088.xls";
    let blob = await fetch(url).then((r) => r.blob());
    reader.readAsArrayBuffer(blob);

    reader.onload = function (event) {
      var data = new Uint8Array(reader.result);

      var work_book = XLSX.read(data, { type: "array" });

      var sheet_name = work_book.SheetNames;

      var sheet_data = XLSX.utils.sheet_to_json(
        work_book.Sheets[sheet_name[0]],
        {
          header: 1,
        }
      );

      if (sheet_data.length > 0) {
        var table_output = '<table class="table table-striped table-bordered">';
        console.log(sheet_data);
        for (var row = 0; row < sheet_data.length; row++) {
          table_output += "<tr>";
          for (var cell = 0; cell < sheet_data[row].length; cell++) {
            if (
              cell != 0 &&
              cell != 2 &&
              cell != 8 &&
              cell != 9 &&
              cell != 10
            ) {
              let x = JSON.stringify(sheet_data[row][cell]);
              if (x) {
                if (row == 0) {
                  table_output += "<th>" + sheet_data[row][cell] + "</th>";
                } else {
                  if (x.toLowerCase().includes(input.toLowerCase())) {
                    if (cell == 1) {
                      found = true;
                      table_output += "<td>" + sheet_data[row][cell] + "</td>";
                      table_output +=
                        "<td>" + sheet_data[row][cell + 2] + "</td>";
                      table_output +=
                        "<td>" + sheet_data[row][cell + 3] + "</td>";
                      table_output +=
                        "<td>" + sheet_data[row][cell + 4] + "</td>";
                      table_output +=
                        "<td>" + sheet_data[row][cell + 5] + "</td>";
                      table_output +=
                        "<td>" + sheet_data[row][cell + 6] + "</td>";
                      table_output +=
                        "<td>" + sheet_data[row][cell + 10] + "</td>";
                      table_output +=
                        "<td>" + sheet_data[row][cell + 11] + "</td>";
                    }
                    if (cell == 3 && found == false) {
                      table_output +=
                        "<td>" + sheet_data[row][cell - 2] + "</td>";
                      table_output +=
                        "<td>" + sheet_data[row][cell + 0] + "</td>";
                      table_output +=
                        "<td>" + sheet_data[row][cell + 1] + "</td>";
                      table_output +=
                        "<td>" + sheet_data[row][cell + 2] + "</td>";
                      table_output +=
                        "<td>" + sheet_data[row][cell + 3] + "</td>";
                      table_output +=
                        "<td>" + sheet_data[row][cell + 4] + "</td>";
                      table_output +=
                        "<td>" + sheet_data[row][cell + 8] + "</td>";
                      table_output +=
                        "<td>" + sheet_data[row][cell + 9] + "</td>";
                    }
                    if (cell == 4 && found == false) {
                      table_output +=
                        "<td>" + sheet_data[row][cell - 3] + "</td>";
                      table_output +=
                        "<td>" + sheet_data[row][cell - 1] + "</td>";
                      table_output += "<td>" + sheet_data[row][cell] + "</td>";
                      table_output +=
                        "<td>" + sheet_data[row][cell + 1] + "</td>";
                      table_output +=
                        "<td>" + sheet_data[row][cell + 2] + "</td>";
                      table_output +=
                        "<td>" + sheet_data[row][cell + 3] + "</td>";
                      table_output +=
                        "<td>" + sheet_data[row][cell + 7] + "</td>";
                      table_output +=
                        "<td>" + sheet_data[row][cell + 8] + "</td>";
                    }
                  }
                }
              }
            } else if (input == "") {
              table_output += "<td>" + sheet_data[row][cell] + "</td>";
            }
          }
          table_output += "<tr>";
        }

        table_output += "</table>";

        document.getElementById("excel_data").innerHTML = table_output;

        var x = document.getElementById("excel_data").rows.length;
        var count = $("#excel_data tr").length;
        console.log(x);
        console.log(count);

        document.querySelectorAll("table tr").forEach(function (e, i) {
          if (e.textContent.trim().length == 0) {
            // if row is empty
            e.parentNode.removeChild(e);
          }
        });
        if (document.querySelectorAll("table tr").length == 1) {
          document.getElementById("excel_data").innerHTML = "";
          document.getElementById("niets").hidden = false;
        }
      }
    };
    document.getElementById("input").value = "";
  } else {
    readTextFile(1);
  }
}
