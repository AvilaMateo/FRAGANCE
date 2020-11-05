const app = new Vue({
  el: "#app",
  data: {
    showAddModal: false,
    showEditModal: false,
    showDeleteModal: false,
    showReportModal: false,
    errorMessage: '',
    successMessage: '',
    facturas: [],
    Rfacturas: [],
    usuario: [],
    activeFactura: {}
  },
  mounted () {
    this.getAllFacturas()
    this.getAlluser()
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
    },
    displayReportModal() {
      return ( this.showReportModal ) ? 'u-show' : ''
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
      }if ( modal === 'report' ) {
        this.showReportModal = !this.showReportModal
      }
      
      
    },
    setMessages (res) {
      if (res.data.error) {
        this.errorMessage = res.data.message
      } else {
        this.successMessage = res.data.message
        this.getAllFacturas()
      }
      setTimeout(() => {
        this.errorMessage = false
        this.successMessage = false
      }, 2000)
    },
    getAllFacturas() {
      axios.get('../PHP/api_venta.php?action=read',)
        .then(res => {
          this.setMessages(res)
          this.facturas = res.data.facturas
        })
    },
    createFactura (e) {
      axios.post( '../PHP/api_venta.php?action=create', new FormData( e.target ) )
        .then( res => {
          this.toggleModal('add')
          this.setMessages(res)
        } )
    },
    getFactura (action, f) {
      this.toggleModal(action)
      this.activeFactura = f
    },
    updateFactura (e) {
      axios.post( '../PHP/api_venta.php?action=update', new FormData( e.target ) )
        .then( res => {
          this.toggleModal('edit')
          this.setMessages(res)
        } )
    },
    deleteFactura (e) {
      axios.post( '../PHP/api_venta.php?action=delete', new FormData( e.target ) )
        .then( res => {
          this.toggleModal('delete')
          this.setMessages(res)
        } )
    },
    reportFactura (e) {
      axios.post( '../PHP/api_venta.php?action=report', new FormData( e.target ) )
        .then( res => {
          this.setMessages(res)
          this.getFactura ('report', 'Rfacturas')
          this.Rfacturas = res.data.Rfacturas
         
        } )
    },

    getAlluser() {
      axios.get('./PHP/api_venta.php?action=read_user',)
        .then(res => {
          this.setMessages(res)
          this.usuario = res.data.usuario
        })
    },
    
  } 
})