const app = new Vue({
  el: "#app",
  data: {
    showAddModal: false,
    showEditModal: false,
    showDeleteModal: false,
    errorMessage: '',
    successMessage: '',
    usuarios: [],
    activeUsuarios: {}
  },
  mounted () {
    this.getAllUsuarios()
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
        this. getAllUsuarios()
      }
      setTimeout(() => {
        this.errorMessage = false
        this.successMessage = false
      }, 2000)
    },
    getAllUsuarios() {
      axios.get('../PHP/api_usuario.php?action=read')
        .then(res => {
          //console.log(res)
          this.setMessages(res)
          this.usuarios = res.data.usuarios
        })
    },
    createUsuario (e) {
      axios.post( '../PHP/api_usuario.php?action=create', new FormData( e.target ) )
        .then( res => {
          this.toggleModal('add')
          this.setMessages(res)
        } )
    },
    getUsuario (action, usuario) {
      this.toggleModal(action)
      this.activeUsuarios = usuario
    },
    updateUsuario (e) {
      axios.post( '../PHP/api_usuario.php?action=update', new FormData( e.target ) )
        .then( res => {
          this.toggleModal('edit')
          this.setMessages(res)
        } )
    },
    deleteUsuario (e) {
      axios.post( '../PHP/api_usuario.php?action=delete', new FormData( e.target ) )
        .then( res => {
          this.toggleModal('delete')
          this.setMessages(res)
        } )
    }
  }
})