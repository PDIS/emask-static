#!/usr/bin/env perl
use 5.12.0;
my $ihk = shift or die "Usage: $0 [IHKEMASK] [PARSED] | uniq -w11";
my $emk = shift or die "Usage: $0 [IHKEMASK] [PARSED] | uniq -w11";

my %seen;
open my $ihk_fh, '<', $ihk or die "Cannot open $ihk: $!";
while (<$ihk_fh>) { chomp;

    my ($id,$act,$token,$birthyear,$timestamp) = split /\|/, $_;
    $seen{$id,$act,$token} = $birthyear;
}

my %ids;
open my $emk_fh, '<', $emk or die "Cannot open $emk: $!";
while (<$emk_fh>) { chomp;
    my ($id,$timestamp,$act,$token,$nm,$marketCd,$storeCd,$birthyearUGC,$mobileNumber,$email) = split /\|/, $_;
    my $birthyear = $seen{$id,$act,$token} // next;
    say join '|', $id, $nm, ($birthyear || $birthyearUGC), $mobileNumber, $email, $marketCd, $storeCd, $timestamp;
}

