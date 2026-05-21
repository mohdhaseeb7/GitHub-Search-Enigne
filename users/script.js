const params = new URLSearchParams(window.location.search)
const user = params.get('y')
const toHome = document.getElementById('to-home')
const avatar = document.getElementById('image')
const name = document.getElementById('name')
const username = document.getElementById('username')
const bio = document.getElementById('bio')
const repoCount = document.getElementById('repositories')
const address = document.getElementById('location')
const website = document.getElementById('website')
const profileBtn = document.getElementById('profile-btn')

const messageBox = document.getElementById('message-box')
const searchBar = document.getElementById('search')
const searchBtn = document.getElementById('search-btn')


async function fetchDetails(user) {
    try {
        const {data} =  (await axios.get(`https://api.github.com/users/${user}`))
        // console.log(data.login);
        
        if(!(data.login)) {
            messageBox.classList.remove('hidden')
            return
        }
            
        avatar.src = data.avatar_url
        name.textContent = data.name
        username.textContent = data.login
        bio.textContent = data.bio
        repoCount.textContent = data.public_repos
        address.textContent = data.location
        website.textContent = data.blog
        
        profileBtn.addEventListener('click', () =>{
            window.location.href = data.html_url
        })
        
    } catch (error) {
        messageBox.classList.remove('hidden')
        
    }
    
    
}

fetchDetails(user)

searchBtn.addEventListener('click', fetchFromSearch)
searchBar.addEventListener('keydown', fetchFromSearch)
toHome.addEventListener('click', () => {
    window.location.href = '../'
})


async function fetchFromSearch(e) {
    try {
        if(e.target.tagName != 'BUTTON' && e.key != 'Enter'){
            return
        }
        // e.preventDefault()
        // console.log(e);
        const user = searchBar.value.trim()
        if (!user) return
        // console.log(user);
        // window.location.href = `http://localhost:5500/03/users/?y=${user}`  

        await fetchDetails(user)
    } catch (error) {
        console.log(error);
        
    }

}



