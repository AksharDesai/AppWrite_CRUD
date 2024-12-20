import './style.css'
import { Client , Databases , ID } from 'appwrite';


const client = new Client();
client
  .setProject('67650aee001c76800945')
  .setEndpoint('https://cloud.appwrite.io/v1') //connect with project 

  
const db = new Databases(client) 
const Database_ID = '67650b490036eb6b539e'
const Collection_ID = '67650b6f00058fa96748'



document.addEventListener('DOMContentLoaded',function(e){
  ReadDocuments()

  
})


async function ReadDocuments(){
  const response = await db.listDocuments(Database_ID,Collection_ID)

  console.log(response);

  for (let i = 0; i < response.documents.length; i++) {
    
      addTask(response.documents[i].task,response.documents[i].$id,response.documents[i].completed);

      
      
      
      
  }

  
}



const form = document.querySelector('form');
const input = document.querySelector('input')
const container = document.querySelector('.bottom')

form.addEventListener('submit',formSubmit)


async function formSubmit(){
  event.preventDefault()
  const value = input.value


  const id = ID.unique()
  
  const e = addTask(value,id)
  input.value = ''


  const d = await createDocument(value,e)

 


}

function addTask(value ,id,c=false){


    
    const task = `

         <div class="task-container ${c} " id="${id}">

              <p class="task-text">${value}</p>

              <span class="task-delete">X</span>

              <hr class="${c}-hr">
              

            </div>

    `
    container.insertAdjacentHTML('afterbegin',task)





    const deleteBtn = container.querySelector('.task-delete')
    deleteBtn.addEventListener('click',deleteTask)

    const taskContainer = container.querySelector('.task-container')
    taskContainer.addEventListener('contextmenu',() => updateTask(id))

    return id;


}

function deleteTask(){
  
  const taskContainer = event.target.parentElement;

  
  taskContainer.remove()
  
 
  deleteDocument(taskContainer)

}

function updateTask(id){
  event.preventDefault()
  const taskContainer = event.target;

  const hr = taskContainer.querySelector('hr')

  console.log(hr);
  

  

  

  if (taskContainer.classList.contains('false')) {


    taskContainer.classList.remove('false')
    taskContainer.classList.add('true')
    hr.classList.remove('false-hr')
    hr.classList.add('true-hr')

    updateDocument(id,true)
    
  }else if(taskContainer.classList.contains('true')){

    taskContainer.classList.remove('true')
    taskContainer.classList.add('false')
    hr.classList.add('false-hr')
    hr.classList.remove('true-hr')

    updateDocument(id,false)

  }
  

  

}

async function updateDocument(uniqueID,value) {
  const response = await db.updateDocument(Database_ID,Collection_ID,uniqueID,{'completed':value})

  console.log(response);
}

async function createDocument(value,uniqueID){

 
    const response = await db.createDocument(Database_ID,Collection_ID,uniqueID,{'task':value})

    console.log(response);


    
}





async function deleteDocument(El) {

      console.log(El);
      

      const elementID = El.getAttribute('id');
      
      const repsonse = await db.deleteDocument(Database_ID,Collection_ID,elementID)

      console.log(repsonse);
      
}












