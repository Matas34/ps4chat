import { CategoryService } from "./.services/.MainServices";
import { StatusHelper } from "./.dataProcessingHelpers/DataProccessingHelpersExport";
import { CategoryErrors, CategoryPageErrors } from "../.constants/MainConstants";
import { CategoryMapper, CategoryPageMapper } from "./.mappers/.MainMappersExport";

class CategoryController {
    static async Post(Category) {
        try {
            let jsonData = CategoryMapper.toJson(Category);
            const response = await CategoryService.postCategory(jsonData)
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${CategoryErrors.PostError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return CategoryMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Get(id) {
        try {
            const response = await CategoryService.getCategory(id);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${CategoryErrors.GetError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return CategoryMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Put(Category) {
        try {
            let jsonData = CategoryMapper.toJson(Category);
            console.log(Category);
            const response = await CategoryService.putCategory(jsonData);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${CategoryErrors.PutError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return CategoryMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async Delete(id) {
        try {
            const response = await CategoryService.deleteCategory(id);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${CategoryErrors.DeleteError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async Search(search: string, userId?: number) {
        try {
            const response = await CategoryService.getCategoriesByTitle(search, userId);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${CategoryPageErrors.SearchError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return CategoryPageMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async GetPage(page, userId?: number) {
        try {
            const response = await CategoryService.getCategoriesByPage(page, userId);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${CategoryPageErrors.GetPageError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return CategoryPageMapper.fromJson(response);
        } catch (error) {
            throw error;
        }
    }

    static async PostImage(categoryId, file) {
        try {
            const response = await CategoryService.postImage(categoryId, file);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${CategoryErrors.PostImageError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async GetImage(categoryId) {
        try {
            const response = await CategoryService.getImage(categoryId);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${CategoryErrors.GetImageError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    static async DeleteImage(categoryId) {
        try {
            const response = await CategoryService.deleteImage(categoryId);
            if (!response || StatusHelper.isError(response)) {
                throw new Error(`${CategoryErrors.DeleteImageError()}. Details ${StatusHelper.getErrorMessage(response)}`);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

}

export { CategoryController }