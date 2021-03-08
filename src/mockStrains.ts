const mockStrains = {
  nextCursor: 1563868285000,
  totalCount: 11,
  strains: [
    {
      id: "DBS0351367",
      label: "myoB-/[act15]:myoB(S332A)",
      summary: "myoB with S332A substitution expressed in myoB null",
      in_stock: false,
      __typename: "Strain",
    },
    {
      id: "DBS0351366",
      label: "HL206/XP99",
      summary:
        "heterozygote diploid tester strain; Parents: HL206 and XP99(DBS0237086)",
      in_stock: false,
      __typename: "Strain",
    },
    {
      id: "DBS0351365",
      label: "HL501/X55",
      summary: "heterozygote diploid tester strain; Parents: HL501 and X55",
      in_stock: true,
      __typename: "Strain",
    },
    {
      id: "DBS0351364",
      label: "HL23/HL106",
      summary:
        "heterozygote diploid tester strain; Parents: HL23(DBS0236216) and HL106(DBS0236209)",
      in_stock: false,
      __typename: "Strain",
    },
    {
      id: "DBS0351363",
      label: "HL84/XM101",
      summary:
        "heterozygote diploid tester strain; Parents: HL84(DBS0351330) and XM101(DBS0237065)",
      in_stock: true,
      __typename: "Strain",
    },
    {
      id: "DBS0351362",
      label: "HL16/HL106",
      summary:
        "heterozygote diploid tester strain; Parents: HL16 and HL106 (DBS0236209)",
      in_stock: true,
      __typename: "Strain",
    },
    {
      id: "DBS0351361",
      label: "HL206/NP377",
      summary:
        "heterozygote diploid tester strain; Parents: HL206 and NP377 (DBS0236648)",
      in_stock: true,
      __typename: "Strain",
    },
    {
      id: "DBS0351360",
      label: "HL206/XP99",
      summary:
        "heterozygote diploid tester strain; Parents: HL206 and XP99(DBS0237086)",
      in_stock: true,
      __typename: "Strain",
    },
    {
      id: "DBS0351359",
      label: "[act15]:myoB",
      summary: "myoB overexpressed in AX3",
      in_stock: false,
      __typename: "Strain",
    },
    {
      id: "DBS0351358",
      label: "HL3",
      summary: "tester strain",
      in_stock: true,
      __typename: "Strain",
    },
  ],
  __typename: "StrainListWithCursor",
}

const mockBacterialStrains = {
  totalCount: 10,
  nextCursor: 0,
  strains: [
    {
      id: "DBS0351098",
      label: "K. pneumoniae",
      summary:
        "bacterial strain Klebsiella pneumoniae, formerly Klebsiella aerogenes and Aerobacter aerogenes; strain is avirulent (P1 security level Europe); genome has been completely sequenced (Lima et al., 2018); Cosson laboratory strain",
      in_stock: true,
      __typename: "Strain",
    },
    {
      id: "DBS0349837",
      label: "K. aerogenes GFP",
      summary:
        "bacterial strain Klebsiella aerogenes, formerly Aerobacter aerogenes, now Klebsiella pneumoniae; biosafety level 2 (USA); this Ka strain expressing GFP was obtained by introducing the GFP-expressing plasmid pANT5 (Lee and Falkow, 1998) into the Cosson laboratory strain, ampR",
      in_stock: true,
      __typename: "Strain",
    },
    {
      id: "DBS0305928",
      label: "K. aerogenes",
      summary:
        "bacterial strain Klebsiella aerogenes, formerly known as Aerobacter aerogenes, now also known as Klebsiella pneumoniae; biosafety level 2 (USA)",
      in_stock: true,
      __typename: "Strain",
    },
    {
      id: "DBS0305925",
      label: "E. coli B/r neoR",
      summary:
        "bacterial strain Escherichia coli B/r-1, neoR; biosafety level 1 (USA)",
      in_stock: true,
      __typename: "Strain",
    },
    {
      id: "DBS0305923",
      label: "B. subtilis LS-3",
      summary:
        "bacterial strain Bacillus subtilis LS-3; biosafety level 1 (USA)",
      in_stock: true,
      __typename: "Strain",
    },
    {
      id: "DBS0305929",
      label: "K. aerogenes cobR",
      summary:
        "bacterial strain Klebsiella aerogenes, cobR; biosafety level 2 (USA)",
      in_stock: true,
      __typename: "Strain",
    },
    {
      id: "DBS0305931",
      label: "K. aerogenes neoR",
      summary:
        "bacterial strain Klebsiella aerogenes, neoR; biosafety level 2 (USA)",
      in_stock: true,
      __typename: "Strain",
    },
    {
      id: "DBS0305930",
      label: "K. aerogenes hygR",
      summary:
        "bacterial strain Klebsiella aerogenes, hygR; biosafety level 2 (USA)",
      in_stock: true,
      __typename: "Strain",
    },
    {
      id: "DBS0305933",
      label: "M. luteus",
      summary: "bacterial strain Micrococcus luteus; biosafety level 1 (USA)",
      in_stock: true,
      __typename: "Strain",
    },
    {
      id: "DBS0305932",
      label: "K. planticola",
      summary:
        "bacterial strain Klebsiella planticola; biosafety level 1 (USA)",
      in_stock: true,
      __typename: "Strain",
    },
  ],
  __typename: "StrainListWithCursor",
}

export { mockStrains, mockBacterialStrains }
