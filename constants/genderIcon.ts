import { ImageRequireSource } from "react-native/Libraries/Image/ImageSource"
import { IGender } from "@models/home"

export const genderIcon: Map<IGender, ImageRequireSource> = new Map([
    ["female", require("../../../assets/AvatarFemale.png")],
    ["male", require("../../../assets/AvatarMale.png")],
    [null, require("../../../assets/AvatarNull.png")],
])


// Usage example:
// genderIcon.get(user.gender)
