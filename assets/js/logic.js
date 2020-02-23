$( document ).ready(function() {

    var canvas = document.getElementById("gol-canvas");
    var context = canvas.getContext("2d");
    
    var tile_edge = 5;
    
    var field_width = canvas.width/tile_edge;
    var field_height = canvas.height/tile_edge;
    
    var field = [];
    var field_tmp = [];
    
    // option values
    var cell_perc = 60; 
    var simulation_speed = 50;
    var play_simulation = true;
    var cell_color = "#000";
    var field_color = "rgba(255,255,255,0.6)";
    
    
    init();
    
            
    // logic handling --------------------
    function cycle(){
        
        if(!play_simulation) return;
        
        check_rules();
        update_field();
        draw_update();
        
        setTimeout(cycle, simulation_speed);
    }
    
    function init(){
        
        draw_background();
                        
        init_logic_array();
        
        clear_field_tmp();
        
        set_random_cells();
        
        draw_update();
        
    }
    
    function init_logic_array(){
        
        // init logic array
        for(var i=0; i<=field_width; i++)
        {
            field[i] = [];
            for(var j=0; j<=field_height; j++)
            {
                field[i][j] = 0;
            }
        }
    }
    
    function set_random_cells(){
        
        // placing cells at random locations
        for(var i=0; i<=parseInt((field_height*field_width)*(cell_perc/100)); i++)
        {
            var x = Math.floor(Math.random() * field_width);
            var y = Math.floor(Math.random() * field_height);

            field[x][y] = 1;    
        }
    }
    
    function check_rules(){
        
        // check each cells neighbours
        for(var i=0; i<=field_width; i++)
        {
            for(var j=0; j<=field_height; j++)
                {
                    count_cells_neighbours(i, j);
                }    
        }
            
    }
    
    function count_cells_neighbours(x, y){
        
        var neighbours = 0;
        
        if(x > 0 && x < (field_width-1) && y > 0 && y < (field_height-1))
        {
            if(field[x-1][y+1] == 1) neighbours++;
            if(field[x][y+1] == 1) neighbours++;
            if(field[x+1][y+1] == 1) neighbours++;
            if(field[x-1][y] == 1) neighbours++;
            if(field[x+1][y] == 1) neighbours++;
            if(field[x-1][y-1] == 1) neighbours++;
            if(field[x][y-1] == 1) neighbours++;
            if(field[x+1][y-1] == 1) neighbours++;    
        }else
            {
                // borders are dead
                neighbours = 2;
            }
        
        if(neighbours == 3) field_tmp[x][y] = 1;
        if(neighbours < 2) field_tmp[x][y] = 0;
        if(neighbours > 3) field_tmp[x][y] = 0;
        
    }
    
    function update_field(){
        for(var i=0; i<=field_width; i++)
        {
            for(var j=0; j<=field_height; j++)
                {
                    field[i][j] = field_tmp[i][j];
                }    
        }
    }
    
    function clear_field_tmp(){
        for(var i=0; i<=field_width; i++)
        {
            field_tmp[i] = [];
            for(var j=0; j<=field_height; j++)
            {
                field_tmp[i][j] = 0;
            }
        }
    }
    
    
    // drawing on canvas --------------------
    function draw_background(){
        
        // colors the background
        context.fillStyle = field_color;
        context.fillRect(0, 0, field_width*10, field_height*10);
    }
    
    function draw_update(){
        for(var i=0; i<=field_width-1; i++)
        {
            for(var j=0; j<=field_height-1; j++)
                {
                    if(field[i][j]==1)
                    {
                        draw_cell(i, j);
                    }else
                        {
                            clear_cell(i, j);
                        }
                }    
        }
    }
    
    function draw_cell(x, y){
        
        // draw cell on canvas
        context.fillStyle = cell_color;
        context.fillRect(x*tile_edge, y*tile_edge, tile_edge, tile_edge);
    }
    
    function clear_cell(x, y){
        
        // clear cell on canvas
        context.fillStyle = field_color;
        context.fillRect(x*tile_edge, y*tile_edge, tile_edge, tile_edge);
    }

    // input events ----------------------
    $('#start-simulation').click(function(){
        play_simulation = true;
        cycle();
    });

});