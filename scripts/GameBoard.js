/*
Copyright 2011 Saiyasodharan (http://saiy2k.blogspot.com/)

This file is part of the open source game, Zic-Zac-Zoe (https://github.com/saiy2k/zic-zac-zoe/)

SpiroCanvas is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

SpiroCanvas is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Zic-Zac-Zoe.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
    This game Board class the 
    
	@class
*/
ZicZacZoe.GameBoard		=	function() {

	/** @private */
	var boardImage;
    
    /** @private */
    var xImage;
    
    /** @private */
    var oImage;
    
    /** @private */
    var boardX;
    
    /** @private */
    var boardY;
    
    /** @private */
    var boardWidth;
    
    /** @private */
    var boardHeight;
    
    /** @private */
    var rowCount;
    
    /** @private */
    var colCount;
    
    /** @private */
    var tileWidth;
    
    /** @private */
    var tileHeight;

    /** @private */
    var hoverTileX;

    /** @private */
    var hoverTileY;
    
    /** @private */
    var selectedTileX;

    /** @private */
    var selectedTileY;
    
    /** @private */
    var tiles           =   [];
    
	this.init			=	function(ctx) {
        rowCount        =   10;
        colCount        =   10;
        currentPlayerID =   0;
        
        boardX          =   $('#boardCanvas').offset().left;
        boardY          =   $('#boardCanvas').offset().top;
		
		tiles			=	ZicZacZoe.GameState.tiles;
		
		refreshUI();
		loadResources();
	};
	
	this.resize			=	function() {
		refreshUI();
		loadResources();
	};
    
    this.update         =   function(m, clk) {        
        var mx          =   (m.x - boardX);
        var my          =   (m.y - boardY);
        hoverTileX		=	-1;
		hoverTileY		=	-1;
		
        if(mx > 0 && my > 0 && mx < boardWidth && my < boardHeight)
        {
            hoverTileY          =   Math.floor(mx / tileWidth);
            hoverTileX          =   Math.floor(my / tileHeight);
			
			if ( tiles[hoverTileX][hoverTileY] !== -1)
			{
				hoverTileX		=	-1;
				hoverTileY		=	-1;
			}
        }
        
        if(clk !== null)
        {
            var cx				=   (clk.x - boardX);
            var cy          	=   (clk.y - boardY);
            
			if( hoverTileX != -1 )
			{
				selectedTileX	=	hoverTileX;
				selectedTileY	=	hoverTileY;
				tiles[selectedTileX][selectedTileY] =   ZicZacZoe.GameState.currentPlayerID;
				
				ZicZacZoe.GameState.selectedTileX	=	selectedTileX;
				ZicZacZoe.GameState.selectedTileY	=	selectedTileY;
			}
        }
    };
    
    this.draw           =   function(ctx) {
        ctx.drawImage(boardImage, 0, 0);
        
        for (var i = 0; i < rowCount; i++)
        {
            for (var  j = 0; j < colCount; j++)
            {
                var tileID  = tiles[i][j];

                if( tileID === 0 )
                {
                    ctx.drawImage(xImage, j*tileWidth, i*tileHeight, tileWidth, tileHeight);
                }
                else if( tileID === 1 )
                {
					ctx.drawImage(oImage, j*tileWidth, i*tileHeight, tileWidth, tileHeight);
				}
            }
        }
        
        ctx.fillStyle   =   'rgba(255, 0, 0, 0.5);';
        ctx.beginPath();
        ctx.rect(hoverTileY*tileWidth, hoverTileX*tileHeight, tileWidth, tileHeight);
        ctx.closePath();
        ctx.fill();
    };
	
	/** @private */
	var loadResources	=	function()
	{
		var strSize;
		
		if ( $(window).width() > 800 )
			strSize					=	'2X';
		else
			strSize					=	'';
		
		boardImage				=	new Image();
		boardImage.src			=	'images/board' + strSize + '.jpg';
		
		oImage                  =   new Image();
		oImage.src              =   'images/oTile' + strSize + '.png';
		
		xImage                  =   new Image();
		xImage.src              =   'images/xTile' + strSize + '.png';
	};
	
	/** @private */
	var refreshUI					=	function()
	{
		var	boardCanvas				=	document.getElementById('boardCanvas');
		
		if ( $(window).width() > 800 ) {
			boardWidth              =   480;
            boardHeight             =   480;
		}
		else {
			boardWidth              =   320;
            boardHeight             =   320;
		}
		
		boardCanvas.width			=	boardWidth;
		boardCanvas.height			=	boardHeight;
		
		tileWidth					=   boardWidth / colCount;
		tileHeight              	=   boardHeight / rowCount;
	};
};