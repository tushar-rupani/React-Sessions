import { post } from "./methods/methods";
export const postIntoPlaceholder = async(data) => {
    const response = await post(`https://jsonplaceholder.typicode.com/posts`, data);
    const ans = await response.json();
    return ans;
}