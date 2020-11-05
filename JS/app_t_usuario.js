const app = new Vue({
  el: "#app",
  data: {
    showAddModal: false,
    showEditModal: false,
    showDeleteModal: false,
    errorMessage: '',
    successMessage: '',
    tipo_usuario: [],
    activeTipo_usuario: {}
  },
  mounted () {
    this.getAllTipo_usuario()
  },
  computed: {
    displayAddModal () {
      return ( this.showAddModal ) ? 'u-show' : ''
    },
    displayEditModal () {
      return ( this.showEditModal ) ? 'u-show' : ''
    },
    displayDeleteModal() {
      return ( this.showDeleteModal ) ? 'u-show' : ''
    }
  },
  methods: {
    toggleModal (modal) {
      if ( modal === 'add' ) {
        this.showAddModal = !this.showAddModal
      } else if ( modal === 'edit' ) {
        this.showEditModal = !this.showEditModal
      } if ( modal === 'delete' ) {
        this.showDeleteModal = !this.showDeleteModal
      }
    },
    setMessages (res) {
      if (res.data.error) {
        this.errorMessage = res.data.message
      } else {
        this.successMessage = res.data.message
        this. getAllTipo_usuario()
      }
      setTimeout(() => {
        this.errorMessage = false
        this.successMessage = false
      }, 2000)
    },
    getAllTipo_usuario() {
      axios.get('../PHP/api_t_usuario.php?action=read')
        .then(res => {
          //console.log(res)
          this.setMessages(res)
          this.tipo_usuario = res.data.tipo_usuario
        })
    },
    createTipo_usuario (e) {
      axios.post( '../PHP/api_t_usuario.php?action=create', new FormData( e.target ) )
        .then( res => {
          this.toggleModal('add')
          this.setMessages(res)
        } )
    },
    getTipo_usuario (action, tipo) {
      this.toggleModal(action)
      this.activeTipo_usuario = tipo
    },
    updateTipo_usuario (e) {
      axios.post( '../PHP/api_t_usuario.php?action=update', new FormData( e.target ) )
        .then( res => {
          this.toggleModal('edit')
          this.setMessages(res)
        } )
    },
    deleteTipo_usuario (e) {
      axios.post( '../PHP/api_t_usuario.php?action=delete', new FormData( e.target ) )
        .then( res => {
          this.toggleModal('delete')
          this.setMessages(res)
        } )
    }
  }
})