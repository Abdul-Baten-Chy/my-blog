const handler = async (display)=> {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const rawData = await res.json()
    const dataInArray = rawData.data;
    const tabContainer = document.getElementById('tab-container');
    
    dataInArray.forEach((data)=>{
        console.log(data);
        const newTab = document.createElement('div');
        newTab.innerHTML = `
        <button class="btn bg-[#dddcdc33] focus:bg-orange-500 mx-4" onclick = displayHandler(${data?.category_id})>${data?.category}</button>
       

        `
        tabContainer.appendChild(newTab);
    })
    
    }


    const displayHandler =async (id)=>{
        const res =await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
        const data = await res.json()
        const arrayDataForCard = data.data;
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerText='';
        
        arrayDataForCard.forEach((data)=>{


          const uploadTime = data?.others?.posted_date;
          const convertedTominites = uploadTime / 60;
          const minitues = Math.round(convertedTominites % 60);  //minitues 
          const remainingHours = convertedTominites -minitues;
          const hours = Math.round(remainingHours /60);  // hours 
          const cardElement = document.createElement('div');
          const image = 'Icon.png';
           
           cardElement.innerHTML = `
        <div class="card card-compact  bg-base-100 shadow-xl">
            <figure><img src="${data?.thumbnail} " alt="Shoes" class="h-[200px] w-full object-cover " /></figure>
            <p id="upload-time" class="text-right pr-3 -mt-7 text-white font-bold" >${hours} Hours ${minitues}Min ago</p>
            
          <div class="card-body">
           <div class="flex items-center gap-4">
           <figure><img src="${data?.authors[0].profile_picture}" class="rounded-full w-10 h-10" alt="Shoes" /></figure>
           <h2 class="card-title text-[#171717] text-base font-bold">${data.title}</h2>
           </div>
            <p class="ml-14">${data?.authors[0]?.profile_name} ${data?.authors[0]?.verified? 'icon': ''}</p>
            <p class="ml-14">${data?.others?.views} Views</p>
          </div>
        </div>
           
           `

           cardsContainer.appendChild(cardElement);
        })
        
            
            
        }
handler(displayHandler);
displayHandler('1001');