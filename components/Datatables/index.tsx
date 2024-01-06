"use client";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FormEvent, useEffect, useState } from "react";

type DatatablesHeaderProps = {
  name: string;
  label?: string;
  className?: string;
  isDisabledSearch?: boolean;
};

type DatatablesLengthMenuProps = {
  listLength: number[] | string[];
  labelLength?: number[] | string[] | any[];
};

type DatatablesSettingColumnsProps = {
  className?: string;
  width?: number | string;
  target: number | string;
};

type DatatablesProps = {
  headers: DatatablesHeaderProps[];
  className?: string;
  lengthMenu?: DatatablesLengthMenuProps;
  isServerSide?: boolean;
  data?: any[];
  settingColumns?: DatatablesSettingColumnsProps[];
};

const Datatables = ({
  headers,
  className,
  lengthMenu,
  isServerSide = false,
  data = [],
}: DatatablesProps) => {
  const [listLengthMenu, setListLengthMenu] =
    useState<DatatablesLengthMenuProps>({
      listLength: [10, 20, 50],
      labelLength: [10, 20, 50],
    });
  const [dt, setDt] = useState<any[]>([]);
  const [lengthDt, setLengthDt] = useState<number>(0);
  const [showedDt, setShowedDt] = useState<any[]>([]);
  const [filteredDt, setFilteredDt] = useState<any[]>([]);
  const [currentLengthData, setCurrentLengthData] = useState<number>(
    Number(listLengthMenu.listLength[0])
  );
  const [lengthIndex, setLengthIndex] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lastIndex, setLastIndex] = useState<number>(0);
  const [searchData, setSearchData] = useState<string>("");

  const changeLimitData = async (e: FormEvent<HTMLSelectElement>) => {
    const curr = Number(e.currentTarget.value);
    setCurrentLengthData(() => {
      return curr;
    });
    setCurrentIndex(0);
  };

  const changeCurrentIndex = (jenis: number) => {
    setCurrentIndex((c) => {
      if (jenis === 1) {
        c++;
      } else {
        c--;
      }
      return c;
    });
  };

  const changeSearchData = (e: FormEvent<HTMLInputElement>) => {
    setSearchData(e.currentTarget.value);
    setCurrentIndex(0);
  };

  useEffect(() => {
    if (lengthMenu) {
      if (lengthMenu.listLength) {
        setListLengthMenu((c) => {
          c.listLength = lengthMenu.listLength;
          if (lengthMenu.labelLength) {
            c.labelLength = lengthMenu.labelLength;
          } else {
            c.labelLength = lengthMenu.listLength;
          }
          return c;
        });

        setCurrentLengthData(() => Number(listLengthMenu.listLength[0]));
      }
    }

    setDt(data);
    setFilteredDt(data);
    setLengthDt(() => data.length);
  }, []);

  useEffect(() => {
    let startIndexData = currentIndex * currentLengthData;
    let lastIndexData = 0;

    if (searchData != "") {
      setFilteredDt(() => {
        return dt.filter((a, i) => {
          const arrCheck: boolean[] = [];

          headers.forEach((k) => {
            if (!k.isDisabledSearch) {
              let isi: any = a[k.name];
              if (typeof isi === "number") {
                isi = isi.toString();
              } else if (typeof isi === "boolean") {
                isi = String(isi);
              }

              arrCheck.push(
                isi.indexOf(searchData) !== false &&
                  isi.indexOf(searchData) >= 0
              );
            }
          });
          return arrCheck.includes(true);
          // console.log(a.username.indexOf("a"));
          // return true;
        });
      });

      if (filteredDt.length <= (currentIndex + 1) * currentLengthData) {
        lastIndexData = filteredDt.length;
      } else {
        lastIndexData = (currentIndex + 1) * currentLengthData;
      }
    } else {
      setFilteredDt(() => dt);
      if (lengthDt <= (currentIndex + 1) * currentLengthData) {
        lastIndexData = lengthDt;
      } else {
        lastIndexData = (currentIndex + 1) * currentLengthData;
      }
    }

    setShowedDt((c) => {
      c = [];

      if (filteredDt.length > 0) {
        for (let i = startIndexData; i < lastIndexData; i++) {
          c.push(filteredDt[i]);
        }
        return c;
      } else {
        return c;
      }
    });

    setLengthIndex(() => {
      let a: number[] = [];
      for (
        let k = 1;
        k <= Math.ceil(filteredDt.length / currentLengthData);
        k++
      ) {
        a.push(k);
      }
      return a;
    });
  }, [currentLengthData, setDt, dt, filteredDt, currentIndex, searchData]);

  useEffect(() => {
    const lastIdx = Math.ceil(filteredDt.length / Number(currentLengthData));
    setLastIndex(() => lastIdx - 1);
    setLengthIndex((i) => {
      i = [];
      for (let k = 1; k <= lastIdx; k++) {
        i.push(k);
      }
      return i;
    });
  }, [dt, currentLengthData, filteredDt]);

  return (
    <div>
      <div className="row flex-md-row flex-column align-items-center justify-content-between">
        <div className="col-xl-1 col-md-2 col-sm-3 col-4 mb-3">
          <select className="form-control input-sm" onChange={changeLimitData}>
            {listLengthMenu.listLength.map((l, k) => {
              return (
                <option value={l} key={k}>
                  {listLengthMenu.labelLength![k]}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-lg-3 col-md-4 col-6 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search data"
            onKeyUp={changeSearchData}
          />
        </div>
      </div>
      <table
        className={
          "mb-3 " +
          (className
            ? className
            : "table table-bordered table-striped table-hover")
        }
      >
        <thead>
          <tr>
            {headers.map((header, i) => {
              return (
                <th
                  key={i}
                  className={
                    header.className ? header.className : "text-center"
                  }
                >
                  {header.label ? header.label : header.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {!isServerSide ? (
            showedDt.length > 0 ? (
              showedDt.map((d, i) => {
                return (
                  <tr key={i}>
                    {headers.map((d1, i1) => {
                      const colName = d1.name;
                      return (
                        <td key={i1} className={d.className ? d.className : ""}>
                          {d[colName]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="text-center" colSpan={headers.length}>
                  Tidak ada data
                </td>
              </tr>
            )
          ) : (
            ""
          )}
        </tbody>
      </table>
      {showedDt.length > 0 && (
        <div className="btn-toolbar justify-content-end">
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => changeCurrentIndex(0)}
              disabled={currentIndex === 0}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            {lengthIndex.map((k, i) => {
              return (
                <button
                  key={i}
                  type="button"
                  className={
                    "btn " +
                    (currentIndex === i
                      ? "btn-secondary"
                      : "btn-outline-secondary")
                  }
                  onClick={() => setCurrentIndex(i)}
                >
                  {k}
                </button>
              );
            })}
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => changeCurrentIndex(1)}
              disabled={currentIndex === lastIndex}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Datatables;
