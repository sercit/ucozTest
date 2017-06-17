function loadUser() {
    localStorage.clear();
    var books = [];
        books.push({
            id:0,
            name:"Twelve Years a Slave",
            author:" Solomon Northup",
            year:2009,
            pages:141
        });
        books.push({
            id:1,
            name:"1984",
            author:"George Orwell",
            year:1949,
            pages:198
        });
        books.push({
            id:2,
            name:"Fahrenheit 451: A Novel",
            author:"Ray Bradbury",
            year:1953,
            pages:194
        });
        books.push({
            id:3,
            name:"The Time Machine",
            author:"H. G. Wells",
            year:1895,
            pages:80
        });
    localStorage.setItem("books",JSON.stringify(books));
    var bookTemplate = $('#book-template').html();
    Mustache.parse(bookTemplate);  
    books = JSON.parse(localStorage.books);
    $('#books').empty();
    books.forEach(function(e){
        if (e){
            var rendered = Mustache.render(bookTemplate, e);
            $('#books').append(rendered);    
        }
    });
}
$(document).ready(function(){
    $('#form').submit(function(e){
        e.preventDefault();
        var type = e.target.attributes.type.value;
        var form = $(this).serializeArray();
        var data={};
        form.forEach(function(e){
            data[e.name]=e.value;
        });
        
        switch(type){
            case 'add':
                addBook(data);
                break;
            case 'edit':
                editBook(data);
                break;
                
        }
        return false;
    });
    function addBook(data){
        $('#form')[0].reset();
        var books = JSON.parse(localStorage.books);
        data.id = books.length;
        
        for(var key in data){
            if (!isNaN(Number(data[key]))){
                data[key] = Number(data[key]);
            }
        }
        books.push(data);
        localStorage.setItem("books",JSON.stringify(books));
        addCard(data);
    }
    function addCard(data){
        var bookTemplate = $('#book-template').html();
        var rendered = Mustache.render(bookTemplate, data);
        $('#books').append(rendered);    
    }
    function editBook(target){
        $('#form')[0].reset();
        var books = JSON.parse(localStorage.books);
         for(var key in target){
             books[target.id][key] = target[key];
         }
         localStorage.setItem("books",JSON.stringify(books));
         $('#form').attr('type','add');
         $('#form h3').html('Add book:');
         editCard(target);
         console.log(books[target]);
    }
    function editCard(target){
        var bookTemplate = $('#book-template').html();
        var rendered = Mustache.render(bookTemplate, target);
        $('#book'+target.id).replaceWith(rendered);   
    }
});
function editForm(target){
    $('#form').attr('type','edit');
    $('#form h3').html('Edit book:');
    var books = JSON.parse(localStorage.books);
    for(var key in books[target]){
        $('#'+key).val(books[target][key]);
    }
    $('#id').val(target);
}
function deleteBook(target){
    if(deleteStatus()){
        $('#form')[0].reset();
        $('#form').attr('type','add');
        $('#form h3').html('Add book:');
        var books = JSON.parse(localStorage.books);
        console.log(books);
        delete books[target];
        //if(books.length){
            console.log(books.length);
        //}
        localStorage.setItem("books",JSON.stringify(books));
        deleteCard(target);
    }
}
function deleteStatus(){
    var a = confirm('Are you sure?');
    if (a){return true}
    return false;
    
}
function deleteCard(target){
    $('#book'+target).remove();
}