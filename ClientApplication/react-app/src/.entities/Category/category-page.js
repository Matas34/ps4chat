class CategoryPage {
    constructor() {
        this.#createEmptyCategoryPage();
    }

    static createCategoryPageFromParams(categoryList = [], categoryCount = 0) {
        const categoryPage = new CategoryPage();
        categoryPage.#createCategoryPageFromParams(categoryList, categoryCount);
        return categoryPage;
    }

    #createEmptyCategoryPage() {
        this._categoryList = [];
        this._categoryCount = 0;
    }

    #createCategoryPageFromParams(categoryList = [], categoryCount = 0) {
        this._categoryList = categoryList;
        this._categoryCount = categoryCount;
    }

    // Getter for categoryList
    get categories() {
        return this._categoryList;
    }

    // Getter for categoryCount
    get count() {
        return this._categoryCount;
    }

}

export default CategoryPage;