import React from "react";
import { ColumnHeader } from "./ColumnHeader";
import { Row } from "./Row";
import { inject, observer } from "mobx-react";
import { LocationsStore, SortParam } from "./Stores/LocationStore";
import {Location} from "./Interfaces";
import {Pagination} from "./Pagination";

// import { Location } from "./Interfaces";
enum Comparison {
  more,
  less,
  equals ,
  include
}

type Props = {
  locationsStore?: LocationsStore;
};

type State = {
  column: number;
  comparison: Comparison;
  searchString: string;
};



@inject("locationsStore")
@observer
export class Table extends React.Component<Props, State> {
  state: State = {
    column: 0,
    comparison: 0,
    searchString: "",
  };

  componentDidMount(): void {
    this.props.locationsStore?.init(this.props.locationsStore?.searchTerm);
  }

  setStatus(): void {
    this.props.locationsStore?.init(this.props.locationsStore?.searchTerm);
  }

  render() {
    const { locationsStore } = this.props;

    return (
      <div className="container">
        <div className="search">
          <select value={this.state.comparison} onChange={(event) =>
              this.setState({ comparison: Number(event.currentTarget.value) })}>
            <option value="0">Больше</option>
            <option value="1">Меньше</option>
            <option value="2">Равно</option>
            <option value="3">Включает</option>
          </select>
          <select value={this.state.column} onChange={(event) =>
              this.setState({ column: Number(event.currentTarget.value) })}>
            <option value="1">Count</option>
            <option value="2">Distance</option>
            <option value="3">Name</option>
            <option value="4">Date</option>
          </select>
          <input
              type="text"
              value={this.state.searchString}
              onChange={(event) =>
                  this.setState({ searchString: event.currentTarget.value })
              }
          />
          <button
              onClick={() =>
                  this.props.locationsStore?.setSearch(this.state)
              }
          >
            Поиск
          </button>
        </div>
        <table className="table">
          <thead>
            <tr className="tableHeader">{this.columnHeaders}</tr>
          </thead>
          <tbody>
            {locationsStore!.locations.map((location) => (
              <Row
                location={location}
              />
            ))}
          </tbody>
        </table>
        <div className="pages">
          <Pagination
              currentPage={locationsStore!.currentPage}
              availablePages={locationsStore!.availablePages}
              onChange={this.changePage}
          />
        </div>
      </div>
    );
  }

  get columnHeaders() {
    const { locationsStore } = this.props;
    const columns: Array<[keyof Location, string]> = [
      [0, "Name"],
      [1, "Date"],
      [2, "Count"],
      [3, "Distance"],
    ];
    return columns.map(([columnKey, columnName]) => (
      <ColumnHeader
        columnName={columnName}
        columnKey={columnKey}
        sortingParam={locationsStore!.sorting}
        onChange={this.changeSorting}
      />
    ));
  }

  changePage = (pageNumber: number) => {
    this.props.locationsStore?.setPage(pageNumber);
  };
  //
  changeSorting = (sortingParams: SortParam) => {
    this.props.locationsStore?.setSorting(sortingParams);
  };

}
