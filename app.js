const cafelist = document.querySelector('#cafe-list')
const form = document.querySelector('#add-cafe-form')
//create element and render caffe

function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id',doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent='x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafelist.appendChild(li);

    //delete data

    cross.addEventListener('click',(e)=>{
        e.stopPropagation();
        alert("Do you want to delete this record"),true
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })
}

// //getting data
// db.collection('cafes').get().then((snapshot)=>{
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc)
//     });
// })


//saving the data

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    });

    form.name.value='',
    form.city.value=''
})

db.collection('cafes').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    console.log(changes);
    changes.forEach(change=>{
        console.log(change.doc.data())
        if(change.type =='added'){
            renderCafe(change.doc);
        }else if(change.type == 'removed'){
            let li = cafelist.querySelector('[data-id='+change.doc.id+']');
            cafelist.removeChild(li);
        }
    })
})
