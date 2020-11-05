const app = new Vue({
    el: "#app",
    data: {
      errorMessage: '',
      successMessage: '',
      count: '',
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      alertMessage: false,
      responseMessage: "",
      productos: [],
      productoActivo: [],
      productoslimit: [],
      facturas: [],
      Rfacturas: [],
      usuarios:[],
      activeProducto: {},
    },
    mounted () {
      this.getAllProductos()
      this.getAllProductosRecomendados()
      this.getAllCompras() 
      this.getAllUsuarios()
      this.CountCart() 
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
        // setTimeout(() => {
        //   this.showDeleteModal = !this.showDeleteModal
  
        // }, 30000)
      },
      toggleModal2 (modal) {
        if ( modal === 'add' ) {
          this.showAddModal = !this.showAddModal
        } else if ( modal === 'edit' ) {
          this.showEditModal = !this.showEditModal
        } if ( modal === 'delete' ) {
          this.showDeleteModal = !this.showDeleteModal
        }
        setTimeout(() => {
          this.showDeleteModal = !this.showDeleteModal
        }, 1200)
      },
      setMessages (res) {
        if (res.data.error) {
          this.errorMessage = res.data.message
        } else {
          this.successMessage = res.data.message
        }
        // setTimeout(() => {
        //   this.errorMessage = false
        //   this.successMessage = false
        // }, 3000)
      },
      setMessages2 (res) {
          this.count = res.data.count
      },
      
      getAllProductos() {
        axios.get('../PHP/api_product.php?action=read')
          .then(res => {
            //console.log(res)
            this.productos = res.data.productos
          })
      },
      getAllfilterhombre() {
        axios.get('../PHP/api_product.php?action=filtrar1')
          .then(res => {
            //console.log(res)
            this.productos = res.data.productos
          })
      },
      getAllfiltermujer() {
        axios.get('../PHP/api_product.php?action=filtrar2')
          .then(res => {
            //console.log(res)
            this.productos = res.data.productos
          })
      },
      getAllProductosRecomendados() {
        axios.get('../PHP/api_product.php?action=read-limit')
          .then(res => {
            //console.log(res)
            this.productoslimit = res.data.productoslimit
          })
      },
     
      getProducto (action, producto) {
        this.toggleModal(action)
        this.activeProducto = producto
      },
      // registro de usuario
      createUsuario (e) {
        axios.post( '../PHP/api_usuario.php?action=create_user_standar', new FormData( e.target ) )
          .then( res => {
            this.setMessages(res)
            if (!res.data.error) {
                this.toggleModal('add')
                // location.href = '../VIEW_USER/compras.php'
              } else {
               alert("Error al Registrarse")
              }
          } )
      },
      //realizar venta
      createventa (e) {
        axios.post( '../PHP/api_product.php?action=create-venta', new FormData( e.target ) )
          .then( res => {
            this.setMessages(res)
              this.toggleModal('delete')
          } )
          
      },
      redirection(){
        location.href = '../VIEW_USER/compras.php'
      },
      //obtener compras user
      getAllCompras () {
        axios.get('../PHP/api_venta.php?action=read_ventas_user')
        .then(res => {
          this.setMessages(res)
          this.facturas = res.data.facturas
        })
       
      },
      //reporte compras user
    Factura_report(e) {
      axios.post( '../PHP/api_venta.php?action=report_user', new FormData( e.target ) )
        .then( res => {
          this.setMessages(res)
          this.getProducto ('add', 'Rfacturas')
          this.Rfacturas = res.data.Rfacturas
         
        } )
    },
    getAllUsuarios() {
      axios.get('../PHP/api_usuario.php?action=read_user')
        .then(res => {
          //console.log(res)
          this.setMessages(res)
          this.usuarios = res.data.usuarios
        })
    },
    CarritoSesion(e){
      axios.post( '../PHP/api_venta.php?action=create-carrito', new FormData( e.target ) )
          .then( res => {
            this.setMessages(res)
              this.toggleModal2('delete')
              this.CountCart()
        } )          
    },
    editDataUser(e){
      axios.post( '../PHP/api_usuario.php?action=update', new FormData( e.target ) )
      .then( res => {
        this.setMessages(res)
        this.toggleModal('delete')
      } )
    },
    CountCart() {
      axios.get('../PHP/api_venta.php?action=count')
        .then(res => {
          //console.log(res)
          this.setMessages2(res)
        })
    },
    DetalleProducto(){
      axios.get('../PHP/api_product.php?action=detalle')
      .then(res => {
        this.productoActivo = res.data.productoActivo
      })
    },
    deleteCompra(e){
      axios.post( '../PHP/api_venta.php?action=delete_factura', new FormData( e.target ) )
      .then( res => {
        this.setMessages(res)
        console.log(res.data.message)
        this.getAllCompras()
      } )
    }
   }  
})