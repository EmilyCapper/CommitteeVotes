library( supernova )
library( ggplot2 )
library( ggformula )
library( mosaic )
library( plyr )
library( dplyr )

# specifically for these data, where the only 
# votes are ones on HB2454 from congress 111,
# and in report 111-137 part 1
votes <- read.csv( "votes.tsv", sep="\t" )
roll_call_nums <- as.numeric( names( table( votes$vote_num ) ) )

# assigning directionality for each vote based
# on who motioned for each vote, to determine
# partisan directionality
directionality <- as.numeric( table( votes$vote_num ) )
for( num in roll_call_nums ) {
  directionality[ num - roll_call_nums[ 1 ] + 1 ] <- filter( votes, vote_num == num, made_motion == 1 )$party
}
directionality_sum <- c()
for( item in directionality ) {
  directionality_sum <- append( directionality_sum, rep( item, as.numeric( table( votes$vote_num ) )[ 1 ] ) )
}
votes$directionality <- directionality_sum

# assigning values to scale partisan association
# setting up data frame
scales <- data.frame( matrix( ncol = 2, nrow = 0 ) )
colnames( scales ) <- c( "member", "party", "vote_sum" )
# point grading with a basis of zero:
# negative direction is more democratic
# positive direction is more republican
# transform 100 200 / 50 -> 2 4 - 3 -> -1 1
# 1 on 100 motion: add -1
# 0 on 100 motion: add +1
# 1 on 200 motion: add +1
# 0 on 200 motion: add -1
# transform 0 1 * 2 -> 0 2 - 1 -> -1 1
#              No Yes
# -1 1 * -1 ->  1 -1 Dem motion (100)
# -1 1 *  1 -> -1  1 Rep motion (200)
for( m in names( table( votes$member_name ) ) ) {
  member_votes <- filter( filter( votes, member_name == m ), !is.na( vote ) )
  # directionality transform
  d <- member_votes$directionality / 50 - 3
  # vote transform, eliminate 3 and 4 first
  # f(x) = 2x-1, f(0.5) = 0
  member_votes$vote[ member_votes$vote == 2 ] <- 0.5
  member_votes$vote[ member_votes$vote == 3 ] <- 0.5
  v <- member_votes$vote * 2 - 1
  # fetch party
  p <- member_votes$party[ 1 ]
  # report combined
  scales <- rbind( scales, data.frame( member = m, party = p, vote_sum = sum( d * v ) ) )
}
# remap party values
scales$party <- mapvalues( scales$party, from = c( 100, 200 ), to = c( "Democratic", "Republican" ) )

# display computed data
gf_jitter( scales, vote_sum ~ "All", color = ~ party ) %>%
  gf_boxplot( alpha = 0.2 ) %>%
  gf_refine( scale_color_manual( values = c( "skyblue", "lightcoral" ) ) )

