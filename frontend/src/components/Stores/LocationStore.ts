import { Location } from '../Interfaces'
import { observable, computed, action } from 'mobx'
import { networkService } from '../../services/network.service'
enum Comparison {
    more,
    less,
    equals ,
    include
}

export type SortParam = {
    column: keyof Location;
    isAscending: boolean;
}

export type SearchParam = {
    column: number;
    comparison: Comparison;
    searchString: string
}

export class LocationsStore {

    @observable 
    private _locations: Location[] = [];

    @observable
    private _currentPage: number = 0;

    @observable
    private _availablePages: number = 0;

    @observable
    private _sorting: SortParam | null = null;

    @observable
    private _searchTerm: SearchParam | null = null;

    @computed
    get sorting(): SortParam | null {
        return this._sorting;
    }

    @computed
    get searchTerm(): SearchParam | null{
        return this._searchTerm;
    }

    @computed 
    get locations(): Location[] {
    
        let copy = [...this._locations];

        if (this._sorting != null && copy.length > 0) {
            const arr = this._sorting.isAscending;
            const key: keyof Location = this._sorting.column;
            if (key === 0) {
                copy.sort((prev, next) => prev[key].toString().localeCompare(next[key].toString()) * ( arr? 1:-1 ));
            }
            else if (key === 2 || key === 3) {
                copy.sort((prev, next) => ((prev[key] as number) - (next[key] as number)) * ( arr? 1:-1 ));
            }
        }
        return copy.slice(this._currentPage * 4, this._currentPage * 4 + 4);

    }

    @computed
    get availablePages(): number {
        return this._availablePages;
    }

    @computed
    get currentPage(): number {
        return this._currentPage;
    }

    @action
    setPage(page: number): void {
        this._currentPage = page;
    }

    @action 
    async init(params: SearchParam | null) {

        this._locations = await networkService.get<Location[]>(params);

        this._availablePages = Math.ceil(this._locations.length / 4);

    }

    @action
    setSorting(sortingParams: SortParam) {
        this._sorting = sortingParams;
    }

    @action
    setSearch(search: SearchParam | null) {
        this._searchTerm = search;
    }

}
