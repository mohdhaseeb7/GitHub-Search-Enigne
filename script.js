const profileGrid = document.getElementById('profile-container')
const profileBtn = document.getElementById('profile-btn')
const toHome = document.getElementById('to-home')
const searchBar = document.getElementById('search')
const searchBtn = document.getElementById('search-btn')

const fetchDetails = async () => {
    try {
        const { data } = await axios.get('https://api.github.com/users')
        displayGrid(data)
    } catch (error) {
        console.log(error);
    }
    // console.log(data);
}


function displayGrid(users) {
    profileGrid.innerHTML = ''
    users.forEach(usr => {
        const card = document.createElement('div')
        card.classList.add('profile')
        card.innerHTML = `<img class="image" src="${usr.avatar_url}" alt="avatar-img">
            <div id="container">
                <div>
                    <p>@<span id="username">${usr.login}</span></p>
                </div>
                <div>
                    <button class="profile-btn" id="${usr.login}">View Profile</button>
                </div>
            </div>`


        profileGrid.append(card)


        card.addEventListener('click', (evn) => {

            if (evn.target.tagName != 'BUTTON') return
            console.log(evn);

            const id = evn.target.id
            // console.log(id);                

            window.location.href = `./users/?y=${id}`
        })
    });



}

fetchDetails()



searchBtn.addEventListener('click', searchUser)
searchBar.addEventListener('keydown', searchUser)
toHome.addEventListener('click', () => {
    window.location.href = './'
})

function searchUser(e) {
    if(e.target.tagName != 'BUTTON' && e.key != 'Enter'){
        return
    }
    // e.preventDefault()
    console.log(e);
    const user = searchBar.value.trim()
    if (!user) return
    console.log(user);
    window.location.href = `./users/?y=${user}`


}



