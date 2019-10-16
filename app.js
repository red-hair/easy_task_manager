// console.log(this)
var filters = {
    open: function(tasks) {
        // let hoge = "aaa"
        // debugger
        // console.log(this)
        return tasks.filter(function (task) {
            // debugger
            // console.log(hoge)
            return task.status === 1
        })
    },
    // filtersを定義。中にopen, doing, closedというkeyを持つオブジェクトを記述, valueに関数を記述
    // open = tasks内の配列にたいして.filterメソッドを実行。statusが1と等しい値を除いた新しい配列を取得する
    doing: function(tasks) {


        return tasks.filter(function (task) {

            return task.status === 2
        })
    },
    closed: function(tasks) {
        return tasks.filter(function (task) {
            return task.status === 3
        })
    }
}

Vue.component('task-card', {
    props: ['task'],
    // v-bindとpropsはセット。renderのローカル変数を受け取っているイメージ
    template: `<div class="card">
                    <div class="card-content">
                        {{ task.name }}
                    </div>
                    <footer class="card-footer">
                        <div class="card-footer-item">
                            {{ task.assignee }}
                        </div>
                        <div class="card-footer-item">
                            {{ task.mandays }}　人日
                        </div>
                    </footer>
                    <footer class="card-footer">
                        <a @click="decrementStatus(task)" class="card-footer-item">◀</a>
                        <a @click="incrementStatus(task)" class="card-footer-item">▶</a>
                    </footer>
                </div>`,
    methods: {
        incrementStatus: (task)　=> {
            // functionを記述しない場合はアロー関数で引数を関数に与えて上げるような記述を行う
            if(1 <= task.status && task.status <= 2) {
                task.status++
                // ++は += 1と同じ扱い？
                // 未処理から処理中に移動する際のステータスの値の変更を関数で処理している
                // 1++ = 2
                // 1以上2以下
            }
        },
        decrementStatus: (task) => {
            if(2 <= task.status && task.status <= 3) {
                task.status--
                // 処理中から完了に変更している
                //  2++ = 3
                // 2以上3以下
            }
        }
    }
    // ,
    // mounted(){
    //     var unko = this
        // console.log(this)
        // console.log(this.task)
    // }
})



new Vue({
    el: "#board",
    data: {
        tasks: [
            { name: 'task 1', status: 1, assignee: '😺', mandays: 3 },
            { name: 'task 2', status: 1, assignee: '🐶', mandays: 2 },
            { name: 'task 3', status: 2, assignee: '😺', mandays: 1 },
            { name: 'task 4', status: 3, assignee: '🐹', mandays: 1 }
        ],
        // vueインスタンス内にdataを配置する。tasksに配列を定義。
        // 配列内にオブジェクトを配置し、それぞれのキーとそれに対応した値を入れる
        newTaskName: '',
        newTaskAssignee: null,
        newTaskMandays: 0
        // 新規入力時のデータの初期値をdata:プロパティに定義する
    },
    computed: {
        tasksOpen: function() {
            // console.log(this.tasks)
            return filters.open(this.tasks)
            // vueインスタンス内のtasksの値が更新された場合に、関数が実行されて新しい配列が返される
        },
        tasksDoing: function() {
            return filters.doing(this.tasks)
            // filtersがmodelだと考えるとわかりやすいかも。
            // キー(open,doing,closed)がカラム名で（model.key）で中の関数を呼び出している
            // 関数に渡す引数をdata:から取得する、そのためthisが用いられている
        },
        tasksClosed: function() {
            return filters.closed(this.tasks)
        },
        //　どこで引数(task)が選択されて、uiqueが特定されているか。
        // v-forでtasksが呼ばれた際に,v-bindでkeyが設定され、どのtaskが呼ばれているのか,vueインスタンスが判断できる状態となっている。
        // そのため（this.task）の引数にidを渡さなくても、値が代入される
    },
    methods: {
        addTask () {
            this.tasks.push({ name: this.newTaskName, status: 1, assignee: this.newTaskAssignee, mandays: this.newTaskMandays })
        }
        // 関数で値を入れるための処理を記述。
        // data:の中に準備した初期値を関数で受け取った引数の値に更新して行く
        // pushメソッドは配列の末尾に値を追加出来る
        // returnで配列の中の要素数を返す事ができる
        // pushメソッドで引数にいれたオブジェクト内のvalueの値を更新できるの？
    }
    // mounted(){
    //     console.log(this)
    // }
})

// 雰囲気としてはenumで指定した時のような状態。ステータス管理に数字を振って、数字によって状態を定義してfilters変数に代入する




// app.jsJavaScript
// Vue.component('task-card', {
// 	props: ['task'],
//   template: `<div class="card">
//             <div class="card-content">
//               {{ task.name }}
//             </div>
//             <footer class="card-footer">
//               <div class="card-footer-item">
//                 {{ task.assignee }}
//               </div>
//               <div class="card-footer-item">
//                 {{ task.mandays }} 人日
//               </div>
//             </footer>
//             <footer class="card-footer">
//               <a class="card-footer-item">◀︎</a>
//               <a class="card-footer-item">▶︎</a>
//             </footer>
//           </div>`
// })
