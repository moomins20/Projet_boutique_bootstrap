// import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

var format_affichage_en_cours = "mosaique";

// MOSAÏQUE ET LISTE EN JQUERY

$(function() {
    $("#btn-mosaique").click(function(){
        if(format_affichage_en_cours != "mosaique") {
            format_affichage_en_cours = "mosaique";

            $( this ).addClass('active');
            $('#btn-liste').removeClass('active');
            $('#conteneur-liste').slideUp(200);
            $('#conteneur-mosaique').slideDown(200);     
        }      
    });  
  
    $("#btn-liste").click(function(){
        if(format_affichage_en_cours != "liste") {
            format_affichage_en_cours = "liste";

            $( this ).addClass('active');
            $( this ).removeClass('liste');
            $('#btn-mosaique').removeClass('active');
            $('#conteneur-mosaique').slideUp(200);     
            $('#conteneur-liste').slideDown(200);
        }      
    });   
});

// JAVASCRIPT VANILLE

function ajusterTotal() {
    var containerArticles = document.getElementsByClassName('articles-panier')[0]
    var panierLignes = containerArticles.getElementsByClassName('ligne-panier');
    var total = 0;
    var quantiteTotale = 0;
    var badgePanier = document.getElementsByClassName('badge-panier');

    for (var i = 0; i < panierLignes.length; i++) {
        var panierLigne = panierLignes[i]
        var prixProduit = panierLigne.getElementsByClassName('prix-panier')[0]
        var quantitePanier = panierLigne.getElementsByClassName('input-quantite-panier')[0]
        var prix = parseFloat(prixProduit.innerHTML);
        var quantite = parseFloat(quantitePanier.value);
        total = total + (prix * quantite);
        quantiteTotale = quantiteTotale + quantite;
        console.log(quantiteTotale);
    }
    document.getElementsByClassName('prix-total-panier')[0].innerText = total + ' 000';

    for (var i = 0; i < panierLignes.length; i++) {
        badgePanier[i].innerText = quantiteTotale;
    } 
    
}  
   
function panier() { 
        var btnRetirerArticle = document.getElementsByClassName('supprimer');
        for (var i = 0; i < btnRetirerArticle.length; i++) {     
            var boutonRetirer = btnRetirerArticle[i];
            boutonRetirer.addEventListener('click', function retirerArticle() {               
                this.parentElement.parentElement.remove();
                ajusterTotal();
            })      
        }
    
        var quantiteInput = document.getElementsByClassName('input-quantite-panier')
        for (var i = 0; i < quantiteInput.length; i++) {
            var input = quantiteInput[i]
            input.addEventListener('change', changementQuantite)
        }
        
        function changementQuantite(event) {
            var input = event.target
            if (isNaN(input.value) || input.value <= 0) {
                input.value = 1
            }
            ajusterTotal()    
        }
}

var contenuPanier = [];
var nouveauProduitPanier = [];

var btnAjouterPanier = document.getElementsByClassName('ajouter-panier');
for (var i = 0; i < btnAjouterPanier.length; i++) {
    var btnAjout = btnAjouterPanier[i];

    btnAjout.addEventListener('click', function ajouterAuPanier() {
        nouveauProduitPanier = [];
        
        titre = this.getAttribute('data-name');
        sommaire = this.getAttribute('data-summary');
        prix = this.getAttribute('data-price');
        img = this.getAttribute('data-image');

        nouveauProduitPanier.push(img, titre, sommaire, prix);

        contenuPanier.push(nouveauProduitPanier);
        
        // $( '.badge-panier' ).html(contenuPanier.length);

        $('.panier-lignes').append('<li class="ligne-panier d-flex justify-content-between my-3 align-items-center"><div class="image-panier"><img src="'+img+'" class="img-fluid" alt="Visage'+titre+'" width="60px"></div></div><h3 class="produit-panier">'+titre+'</h3><p class="description-panier">'+sommaire+'</p><h4 class="prix-panier">'+prix+'<img src="./assets/img/bell.png" alt="Une clochette dans Animal Crossing" width="40px"></h4><div class="quantite-panier"><input class="input-quantite-panier" type="number" value="1" min="1"></div><div class="supprimer-article"><button class="btn btn-danger supprimer"><i class="bi bi-bag-x-fill"></i></button></div></li');

        panier();
        ajusterTotal();
    })
}

panier();
