var in_matrix = [];
var out_matrix = [];

var numrows = 4, numcols = 4;
in_matrix = parallel.createZeroMatrix(numrows, numcols);
out_matrix = parallel.createZeroMatrix(numrows, numcols);

in_matrix[0+2*numcols]=9;
in_matrix[0+3*numcols]=2;
in_matrix[1+2*numcols]=1;
in_matrix[1+3*numcols]=7;
in_matrix[2+0*numcols]=9;
in_matrix[2+1*numcols]=1;
in_matrix[3+0*numcols]=2;
in_matrix[3+1*numcols]=7;

outB = parallel.copy(out_matrix);
inB = parallel.copy(in_matrix);