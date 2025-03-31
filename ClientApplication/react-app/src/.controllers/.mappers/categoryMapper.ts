import { Category, CategoryPage } from "../../.entities/.MainEntitiesExport";
import { CategoryJson, CategoryPageJson } from "../../.constants/MainConstants";

class CategoryMapper {
    static fromJson(data) {
        return Category.createCategoryFromParams(
            data[CategoryJson.title], 
            data[CategoryJson.text], 
            data[CategoryJson.id],
            data[CategoryJson.imageFileName],
            data[CategoryJson.articleIds] || []
        );
    }

    static toJson(category) {
        const json = {};
        
        if (category._title) {
            json[CategoryJson.title] = category._title;
        }

        if (category._text) {
            json[CategoryJson.text] = category._text;
        }

        if (category._id) {
            json[CategoryJson.id] = category._id;
        }

        return json;
    }
}

class CategoryPageMapper {
    static fromJson(data) {
        return CategoryPage.createCategoryPageFromParams(
            data[CategoryPageJson.categories].map(category => CategoryMapper.fromJson(category)),
            data[CategoryPageJson.count]
        );
    }
}

export { CategoryMapper, CategoryPageMapper };