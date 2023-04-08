
// Colocar o '$' na frente de toda variável que recebe um elemento HTML

const Main = {

    tasks:[],
    
    init: function(){
        this.selectors()
        this.events()
        this.getStorage()
        this.buildTasks()
    },

    selectors: function(){
        this.checkButtons = document.querySelectorAll('.check')
        this.inputTask = document.querySelector('#inputTask')
        this.list = document.querySelector('#list')
        this.removeButtons = document.querySelectorAll('.remove')
    },

    events: function(){
        const self = this

        this.checkButtons.forEach(function(button){
            button.onclick = self.eventsFunctions.checkButton_click
        })

        this.inputTask.onkeypress = self.eventsFunctions.inputTask_keypress.bind(this)

        this.removeButtons.forEach(function(button){
            button.onclick = self.eventsFunctions.removeButtons_click.bind(self)
        })
    },

    getStorage: function(){
        const tasks = localStorage.getItem('tasks')

        this.tasks = JSON.parse(tasks)
    },

    buildTasks: function(){
        let html = ''
        this.tasks.forEach(item => {
            html += `
            <li>
                <div class="check"></div>
                <label class="task">
                    ${item.task}
                </label>
                <button class="remove" data-task = '${item.task}'></button>
            </li>`
        })

        this.list.innerHTML = html

        this.selectors()
        this.events()
    },

    eventsFunctions: {
        checkButton_click: function(e){
            const li = e.target.parentElement
            const isDone = li.classList.contains('done')

            if (isDone == false){
                li.classList.add('done')
            } else{
                li.classList.remove('done')
            }

            
        },

        inputTask_keypress: function(e){
            const key = e.key
            const value = e.target.value

            if(key === 'Enter'){
                this.list.innerHTML += `
            <li>
                <div class="check"></div>
                <label class="task">
                    ${value}
                </label>
                <button class="remove" data-task = '${value}'></button>
            </li>`

            e.target.value = ''

            this.selectors()
            this.events()

            const savedTasks = localStorage.getItem('tasks')
            const savedTaskObj = JSON.parse(savedTasks)

            const objeto = [
                { task: value},
                ...savedTaskObj,
            ]

            localStorage.setItem('tasks', JSON.stringify(objeto))
            }
        },
        
        removeButtons_click: function(e){
            const li = e.target.parentElement
            const value = e.target.dataset['task']

            const newTaskState = this.tasks.filter(item => item.task !== value)

            localStorage.setItem('tasks', JSON.stringify(newTaskState))

            li.classList.add('removed')

            setTimeout(function(){
                li.classList.add('hidden')
            }, 300) 
        }
    }
}

Main.init()


