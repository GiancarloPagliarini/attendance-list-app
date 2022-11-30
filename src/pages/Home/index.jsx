import React, { useState, useEffect } from 'react'
import './style.css'

import { Card } from '../../components/Card'

export function Home() {
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState([]) // Aqui eu quero armazenar os meus estudantes da minha lista de presença
  const [user, setUser] = useState({name: '',avatar: ''})
  
  let url = 'https://api.github.com/users/giancarlopagliarini'

  function handleAddStudent() { 
    const newStudent = {
      name: studentName, //o nome já esta sendo captado pelo input
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }) //horário exato da máquina
    }
    setStudents(prevState => [...prevState, newStudent])// conteudo do meu estado anterior + meu novo estado (estudante)
    // os ... significam spread operator, serve para ele adicionar todo mundo no mesmo array. em vez disso [['Rodrigo'], 'Amanda'] ele faz isso, ['Rodrigo', 'Amanda']
  }
  /*RESUMO 
    Toda vez que eu chamar essa função, ele vai criar um objeto, no caso um novo estudante
    e depois estou adicionando no meu estado setStudents esse novo estudante
  */

useEffect( () => {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    setUser({
      name: data.name,
      avatar: data.avatar_url
    })
  })  
  
}, [] )

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto do usuario" /> {/* Vai pegar a foto de perfil do github*/}
        </div>
      </header>
      
      <input type="text" 
      placeholder="Digite o nome..." 
      onChange={e => setStudentName(e.target.value)}/> {/*entregar para minha função o valor atual do input, sempre o ATUAL*/}


      <button type="button" onClick={handleAddStudent}> {/*toda vez que clicar nesse botão, vai ser chamada essa função*/}
        Adicionar
        </button>


        {students.map(student => 
        <
          Card key={student.time} name={student.name} time={student.time}/>)} 
          
          {/* key ={student.time} o ideal seria um ID, mas como não tem vai essa merda de time mesmo */}
          
          {/* cada estudante sera armazenado aqui, um por um 
          o .map é uma estrutura de repetição, então ele vai passar um por um do nosso array de estudantes */} 
        
    </div> 
  )
}

