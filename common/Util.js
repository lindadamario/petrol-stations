import _ from 'lodash';
const accessToken = 'e6bdb60d3ec5313a17274fc3db04a4fe3d28b0fbe6b0b8305c2c84785a5ac700';
const spaceId = '52dq79v5sxg3'
import fetch from 'isomorphic-unfetch'

export default class Util {
    static async fetchProduct() {
        const res = await fetch(
            `https://dzn55apcn4.execute-api.eu-central-1.amazonaws.com/latest/city/Porvoo`
        );
        const json = await res.json();
        return json;
    }
}