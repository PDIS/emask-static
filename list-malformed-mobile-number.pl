#!/usr/bin/env perl
use 5.12.0;
my $emk = shift or die "Usage: $0 [PARSED] | uniq";

my %seen;
open my $emk_fh, '<', $emk or die "Cannot open $emk: $!";
while (<$emk_fh>) { chomp;
    my ($id,$timestamp,$act,$token,$nm,$marketCd,$storeCd,$birthyearUGC,$mobileNumber,$email) = split /\|/, $_;
    next if $mobileNumber =~ /^[0-9]{10}$/;
    say $email;
}

