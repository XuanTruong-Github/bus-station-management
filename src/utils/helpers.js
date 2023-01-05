import ExcelJS from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import CustomStore from "devextreme/data/custom_store";

function DevExDataSourceCustom(loader, key) {
  if (!(this instanceof DevExDataSourceCustom)) {
    return new DevExDataSourceCustom(loader, key);
  }
  if (typeof loader != "function") {
    throw new Error("`loader` phải là function");
  }

  var options = {};
  options.key = key || "";
  options.load = async function DevExDataSourceCustom_load(loadOptions) {
    loadOptions["skip"] = parseInt(loadOptions["skip"] || 0);

    if (loadOptions["skip"] < 0) {
      loadOptions["skip"] = 0;
    }

    loadOptions["take"] = parseInt(loadOptions["take"] || 0);

    if (loadOptions["take"] < 0 || 100 < loadOptions["take"]) {
      loadOptions["take"] = 100;
    }
    if (loadOptions["searchValue"]) {
      loadOptions["filter"] = [
        loadOptions["searchExpr"],
        loadOptions["searchOperation"],
        loadOptions["searchValue"],
      ];
    }

    var dataSource = await loader(loadOptions);

    return dataSource;
  };

  this.Store = new CustomStore(options);
}
export default {
  excel(options) {
    return new (function () {
      function Export(customizeCell) {
        try {
          if (!options) {
            throw new Exception("Không có các biến khởi tạo");
          }
          if (!options.Element) {
            throw new Exception("Không có Element");
          }
          if (!options.WorkSheet) {
            throw new Exception("Không có Tên worksheet");
          }
          const workbook = new ExcelJS.Workbook();
          const work_sheet = workbook.addWorksheet(options.WorkSheet);
          exportDataGrid({
            worksheet: work_sheet,
            component: options.Element,
            topLeftCell: { row: 1, column: 2 },
            selectedRowsOnly: false,
            autoFilterEnabled: false,
            keepColumnWidths: true,
            loadPanel: {
              enabled: false,
            },
            customizeCell: function (options) {
              const { gridCell, excelCell } = options;
              // background color
              if (gridCell.rowType === "header") {
                excelCell.fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "ffffff" },
                };
              }
              if (gridCell.rowType === "totalFooter") {
                excelCell.fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "a5dae6" },
                };
              }
              if (gridCell.rowType === "group") {
                excelCell.fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "e3e3e3" },
                };
              }
              // custom cell
              if (customizeCell) {
                customizeCell(gridCell, excelCell);
              }
            },
          }).then(function () {
            workbook.xlsx.writeBuffer().then(function (buffer) {
              saveAs(
                new Blob([buffer], {
                  type: "application/octet-stream",
                }),
                options.FileName ? options.FileName + ".xlsx" : "Sonphat.xlsx"
              );
            });
          });
        } catch (e) {
          console.error("Lỗi =======> " + e.message);
        }
      }
      return {
        Export: Export,
      };
    })();
  },
  DevExDataSourceCustom: DevExDataSourceCustom,
};
