use utf8;
use 5.12.0;
use JSON;
use Text::CSV;
my %HSN_NM2CD = reverse("A"=>"臺北市", "B"=>"臺中市", "C"=>"基隆市", "D"=>"臺南市", "E"=>"高雄市", "F"=>"新北市", "G"=>"宜蘭縣", "H"=>"桃園市", "I"=>"嘉義市", "J"=>"新竹縣", "K"=>"苗栗縣", "M"=>"南投縣", "N"=>"彰化縣", "O"=>"新竹市", "P"=>"雲林縣", "Q"=>"嘉義縣", "T"=>"屏東縣", "U"=>"花蓮縣", "V"=>"臺東縣", "W"=>"金門縣", "X"=>"澎湖縣", "Z"=>"連江縣");
my $json = JSON->new->allow_nonref;
my %MSK_TOWN_MAP; # {"#MARKET_CD#HSN_CD" => {TOWN_CD,TOWN_NM}}
my %MSK_STORE_MAP; # { 'FMA中山區': { 5989: '中賓店（台北市中山區中山里中山北路二段５９之３號１樓）' } }
for my $csv (glob('csv/*')) {
    my $parser = Text::CSV->new ({ binary => 1, auto_diag => 1 });
    open my $fh, '<:utf8', $csv or die $!;
    $parser->getline($fh); # skip header
    while (my $row = $parser->getline($fh)) {
        chomp;
        my ($MARKET_CD,$HSN_CD,$HSN_NM,$TOWN_CD,$TOWN_NM,$ZIP,$STORE_CD,$STORE_NM,$ADDR,$ISOPEN) = @$row;
        $HSN_NM =~ s/台/臺/;
        $HSN_NM =~ s/臺東綠島/臺東縣/;
        $HSN_NM =~ s/屏東小琉球/屏東縣/;
        $HSN_CD = $HSN_NM2CD{$HSN_NM} or die "Cannot find HSN Name: $HSN_NM";
        $TOWN_CD ||= $TOWN_NM ||= do {
            # SE cleanup adhoc code
            my $prefix = quotemeta($HSN_NM);
            $prefix =~ s/臺/[台臺]/;
            $ADDR =~ m/^$prefix([^鄉鎮市區]+[鄉鎮市區])/ or next; # warn "[$prefix $ADDR]\n"
            $1;
        };
        ${ $MSK_TOWN_MAP{$MARKET_CD . $HSN_CD} }{ $TOWN_CD } = $TOWN_NM;
        ${ $MSK_STORE_MAP{$MARKET_CD . $HSN_CD . $TOWN_CD} }{ $STORE_CD } = "$STORE_NM（$ADDR）";
    }
}
open my $MSK_TOWN_MAP, '>:utf8', 'MSK_TOWN_MAP.js';
print $MSK_TOWN_MAP "msk.common.MSK_TOWN_MAP =\n";
print $MSK_TOWN_MAP $json->canonical(1)->pretty->encode( \%MSK_TOWN_MAP );
close $MSK_TOWN_MAP;

open my $MSK_STORE_MAP, '>:utf8', 'MSK_STORE_MAP.js';
print $MSK_STORE_MAP "msk.common.MSK_STORE_MAP =\n";
print $MSK_STORE_MAP $json->canonical(1)->pretty->encode( \%MSK_STORE_MAP );
close $MSK_STORE_MAP;
