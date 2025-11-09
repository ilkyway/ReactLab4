class Network {
    constructor(accessKey) {
        this.accessKey = accessKey;
    }
    
    getHeaders() {
        return {
            'Authorization': `Client-ID ${this.accessKey}`,
            'Content-Type': 'application/json'
        };
    }

    async get(url, params = {}) {
        try {

            const urlWithParams = new URL(url);
            Object.keys(params).forEach(key => {
                if (params[key] !== null && params[key] !== undefined) {
                    urlWithParams.searchParams.append(key, params[key]);
                }
            });

            const response = await fetch(urlWithParams.toString(), {
                method: 'GET',
                headers: this.getHeaders()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    }

    async fetchImages(param){
        var res = []
        if( typeof param === 'number'){
            res = await this.fetchRandomImages(param)
        }else if( typeof param === 'string' && param[0] == "@" ){
            res = await this.fetchUserImages(param)
        }else if( typeof param === 'string' && param.trim() !== '' ){
            res = await this.fetchQueryImages(param)
        }else{
            res = await this.fetchRandomImages(10)
        }
        return res
    }

    async fetchUserImages(username) {
        try {

            let url;
            let params = {};

            const cleanUsername = username.startsWith('@') ? username.substring(1) : username;
            url = `https://api.unsplash.com/users/${cleanUsername}/photos`;
            params.per_page = 30;

            const response = await this.get(url, params);
            
            return Array.isArray(response) ? response : [];
        } catch (error) {
            console.error('Error fetching images:', error);
            throw error;
        }
    }


    async fetchQueryImages(query) {
        try {

            let url;
            let params = {};

            url = 'https://api.unsplash.com/search/photos';
            params.query = query;
            params.per_page = 30;

            const response = await this.get(url, params);
            
            return Array.isArray(response.results) ? response.results : [];
        } catch (error) {
            console.error('Error fetching images:', error);
            throw error;
        }
    }

    async fetchRandomImages(count) {
        try {

            let url;
            let params = {};

            url = 'https://api.unsplash.com/photos/random';
            params.count = count;

            const response = await this.get(url, params);
            
            return Array.isArray(response) ? response : [];
        } catch (error) {
            console.error('Error fetching images:', error);
            throw error;
        }
    }
}

export default Network;