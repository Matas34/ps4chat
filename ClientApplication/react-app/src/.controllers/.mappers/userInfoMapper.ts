import { UserInfo } from "../../.entities/.MainEntitiesExport";
import { UserInfoJson } from "../../.constants/MainConstants";

class UserInfoMapper {
    static fromJson (data) {
        return new UserInfo(
            data[UserInfoJson.id],
            data[UserInfoJson.username],
            data[UserInfoJson.wordsRead],
            data[UserInfoJson.minutesRead],
            data[UserInfoJson.correctQuestions],
            data[UserInfoJson.totalQuestions],
            data[UserInfoJson.articlesCountRead]
        );
    }
}

export { UserInfoMapper };