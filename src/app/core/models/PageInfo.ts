/**
 * Page Info model.
 */
export class PageInfo {
    /**
     * @param PageSize number
     * @param PageNumber number
     * @param TotalItems number
     */
    constructor(
        public PageSize: number,
        public PageNumber: number,
        public TotalItems: number
    ) {}
}
