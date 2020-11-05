const app = new Vue({
  el: "#app",
  data: {
    showAddModal: false,
    showEditModal: false,
    showDeleteModal: false,
    errorMessage: '',
    successMessage: '',
    categorias: [],
    activeCategoria: {}
  },
  mounted () {
    this.getAllCategorias()
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
        this. getAllCategorias()
      }
      setTimeout(() => {
        this.errorMessage = false
        this.successMessage = false
      }, 2000)
    },
    getAllCategorias() {
      axios.get('../PHP/api_categoria.php?action=read')
        .then(res => {
          //console.log(res)
          this.setMessages(res)
          this.categorias = res.data.categorias
        })
    },
    createCategoria (e) {
      axios.post( '../PHP/api_categoria.php?action=create', new FormData( e.target ) )
        .then( res => {
          this.toggleModal('add')
          this.setMessages(res)
        } )
    },
    getCategoria (action, categoria) {
      this.toggleModal(action)
      this.activeCategoria = categoria
    },
    updateCategoria (e) {
      axios.post( '../PHP/api_categoria.php?action=update', new FormData( e.target ) )
        .then( res => {
          this.toggleModal('edit')
          this.setMessages(res)
        } )
    },
    deleteCategoria (e) {
      axios.post( '../PHP/api_categoria.php?action=delete', new FormData( e.target ) )
        .then( res => {
          this.toggleModal('delete')
          this.setMessages(res)
        } )
    }
  }
})