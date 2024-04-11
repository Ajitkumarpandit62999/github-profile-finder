let searchInput = document.querySelector(".search-input");
let searchBtn = document.querySelector(".search-btn");
let Base_URL = "https://api.github.com/users/";
let githubProfileDetails = document.querySelector('.github-profile-details');
const loader = document.querySelector(".loader");
const userUrl = "https://github.com/";


function showLoader() {
    loader.classList.add('show-loader');
    githubProfileDetails.classList.add("hide");
}

function removeLoader() {
    loader.classList.remove('show-loader');
    githubProfileDetails.classList.remove('hide');
}


async function fetchGitHubProfileDetails() {
    showLoader();
    const response = await fetch(`${Base_URL}${searchInput.value}`);
    const result = await response.json();
    console.log(result);

    if (result) {
        removeLoader();
        displaypofileDetails(result);
        searchInput.value = " ";
    }

}


function displaypofileDetails(getProfileDetails) {

    const { login, avatar_url, public_repos, followers, following } = getProfileDetails;

    githubProfileDetails.innerHTML = `
    

    <img class="h-52 w-52 object-cover rounded-full " src=${avatar_url} alt=${login}>
    
    <p class="username mt-4 font-bold font-mono"> <span>Username :-</span> ${login}</p>

    <p class="repos font-semibold font-mono "> Repos : ${public_repos}</p>

    <p class="followers font-semibold font-mono "> Followers : ${followers}</p>

    <p class="following font-semibold font-mono "> Following : ${following}</p>

    <a class="font-mono" href="${userUrl}${login}" target="_blank" > GitHub link 👈 </a>

    `;
}

searchBtn.addEventListener('click', fetchGitHubProfileDetails);


function loadonEnter(e){
    if(searchInput.value == ""){
        return;
    }

    if (e.key == "Enter"){
        fetchGitHubProfileDetails();
         searchBox.value = "";
    }
  
}

searchInput.addEventListener("keyup" , loadonEnter);



