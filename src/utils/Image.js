class Image{
    constructor(obj){
        this.id = obj.id
        this.created_at = obj.created_at.split("T")[0]
        this.likes = obj.likes
        this.description = obj.description
        this.url = obj.urls.regular
        this.blur_hash = obj.blur_hash || null
        this.author = new User(obj.user)
    }
}

class User{
    constructor(obj){
        this.id = obj.id
        this.username = obj.username
        this.name = obj.name
        this.avatar = obj.profile_image.small
    }
}

export default Image