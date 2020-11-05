const app = new Vue({
  el: "#app",
  data: {
    errorMessage: '',
    successMessage: '', 
    showAddModal: false,
    showEditModal: false,
    showDeleteModal: false,
    alertMessage: false,
    responseMessage: "",
    productos: [],
    productoslimit:[],
    activeProducto: {},
  },
  mounted () {
    this.getAllProductos()
    this.getAllProductosAdmin()
   
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
        this. getAllProductos()
      }
      setTimeout(() => {
        this.errorMessage = false
        this.successMessage = false
      }, 3000)
    },
    getAllProductos() {
      axios.get('./PHP/api_product.php?action=read-limit')
        .then(res => {
          //console.log(res)
          this.productoslimit = res.data.productoslimit
        })
    },
    getAllProductosAdmin() {
      axios.get('../PHP/api_product.php?action=read')
        .then(res => {
          //console.log(res)
          this.productos = res.data.productos
        })
    },    
    createProducto (e) {
      axios.post( '../PHP/api_product.php?action=create', new FormData( e.target ) )
        .then( res => {
          this.toggleModal('add')
          this.setMessages(res)
          this.getAllProductos()
        } )
    },
    getProducto (action, producto) {
      this.toggleModal(action)
      this.activeProducto = producto
    },
    updateProducto (e) {
      axios.post( '../PHP/api_product.php?action=update', new FormData( e.target ) )
        .then( res => {
          this.toggleModal('edit')
          this.setMessages(res)
        } )
    },
    deleteProducto (e) {
      axios.post( '../PHP/api_product.php?action=delete', new FormData( e.target ) )
        .then( res => {
          this.toggleModal('delete')
          this.setMessages(res)
          this.getAllProductos()
        } )
    },
  }
  
})