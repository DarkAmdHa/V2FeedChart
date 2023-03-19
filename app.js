//When "Calculate" pressed:
$('.calculate_button').click(calculateValues)
$('.calculate_button').click(displayTable)

//When saveAsPDF is pressed
$('.save-pdf').click(saveAsPDF)

//When DOM loads, calculate initial values(0.0)
$(document).ready(calculateValues())
$(document).ready(() => {
  $('.table-container').css('display', 'none')
  $('.save-pdf').css('display', 'none')
})

$('#type').on('change', (e) => {
  calculateValues(e)
})
//Calculate and displays all the  values inseide the table when "calculate" clicked, or when the unirs are changed from the dropdown menu
function calculateValues(e) {
  const input = jQuery('.input')
  const select = document.getElementById('type')
  const selectedUnit = document.querySelector('#unit')
  const unit = jQuery('.unit')

  let ptA_vegMomsConstant,
    ptB_vegMomsConstant,
    ptA_flowerWeekConstant,
    ptB_flowerWeekConstant,
    phosZymeConstant,
    siValueCalculator,
    siStockRate,
    phosZymeStockRate
  if (select.value === 'DtL') {
    if (selectedUnit.value === 'imperial') {
      ptA_vegMomsConstant = 1.355
      ptB_vegMomsConstant = 2.0325
      ptA_flowerWeekConstant = 1.5993
      ptB_flowerWeekConstant = 1.0663
      bloom_flowerWeekConstant = 1.0663
      phosZymeConstant = 0.4
      siValueCalculator = (ecInput) => {
        if (ecInput > 3.5) return 0
        else if (ecInput >= 3.1) return 0.125
        else if (ecInput >= 2.7) return 0.25
        else if (ecInput >= 2.3) return 0.375
        else if (ecInput < 2.3) return 0.5
      }
    } else {
      ptA_vegMomsConstant = 0.54
      ptB_vegMomsConstant = 0.36
      ptA_flowerWeekConstant = 0.42255
      ptB_flowerWeekConstant = 0.28172
      bloom_flowerWeekConstant = 0.28172
      phosZymeConstant = 0.11
      siValueCalculator = (ecInput) => {
        if (ecInput > 3.5) return 0 / 3.78541
        else if (ecInput >= 3.1) return 0.125 / 3.78541
        else if (ecInput >= 2.7) return 0.25 / 3.78541
        else if (ecInput >= 2.3) return 0.375 / 3.78541
        else if (ecInput < 2.3) return 0.5 / 3.78541
      }
    }
  } else {
    if (selectedUnit.value === 'imperial') {
      ptA_vegMomsConstant = 11.3
      ptB_vegMomsConstant = 11.3
      ptA_flowerWeekConstant = 8.89
      ptB_flowerWeekConstant = 8.89
      bloom_flowerWeekConstant = 8.89
      siStockRate = 200
      phosZymeStockRate = 0.35
      phosZymeConstant = (0.4 / (phosZymeStockRate * 454)) * 3785
      siValueCalculator = (ecInput) => {
        if (ecInput > 3.5) return (0 / siStockRate) * 3785
        else if (ecInput >= 3.1) return (0.125 / siStockRate) * 3785
        else if (ecInput >= 2.7) return (0.25 / siStockRate) * 3785
        else if (ecInput >= 2.3) return (0.375 / siStockRate) * 3785
        else if (ecInput < 2.3) return (0.5 / siStockRate) * 3785
      }
    } else {
      ptA_vegMomsConstant = 2.9846
      ptB_vegMomsConstant = 2.9846
      ptA_flowerWeekConstant = 2.349
      ptB_flowerWeekConstant = 2.349
      bloom_flowerWeekConstant = 2.349
      siStockRate = 53
      phosZymeStockRate = 42
      phosZymeConstant = (0.4 / 3.785 / phosZymeStockRate) * 1000
      siValueCalculator = (ecInput) => {
        if (ecInput > 3.5) return (0 / siStockRate) * (1000 / 3.785)
        else if (ecInput >= 3.1) return (0.125 / siStockRate) * (1000 / 3.785)
        else if (ecInput >= 2.7) return (0.25 / siStockRate) * (1000 / 3.785)
        else if (ecInput >= 2.3) return (0.375 / siStockRate) * (1000 / 3.785)
        else if (ecInput < 2.3) return (0.5 / siStockRate) * (1000 / 3.785)
      }
    }
  }

  //Calculating all the values:
  let vegMom_ptA = +input[0].value * ptA_vegMomsConstant,
    vegMom_ptB = +input[0].value * ptB_vegMomsConstant,
    vegMom_bloom = 0,
    vegMom_si = siValueCalculator(+input[0].value),
    vegMom_phosZyme = phosZymeConstant,
    flow1_ptA = +input[1].value * ptA_flowerWeekConstant,
    flow2_ptA = +input[2].value * ptA_flowerWeekConstant,
    flow3_ptA = +input[3].value * ptA_flowerWeekConstant,
    flow4_ptA = +input[4].value * ptA_flowerWeekConstant,
    flow5_ptA = +input[5].value * ptA_flowerWeekConstant,
    flow6_ptA = +input[6].value * ptA_flowerWeekConstant,
    flow7_ptA = +input[7].value * ptA_flowerWeekConstant,
    flow8_ptA = +input[8].value * ptA_flowerWeekConstant,
    flow9_ptA = +input[9].value * ptA_flowerWeekConstant,
    flow1_ptB = +input[1].value * ptB_flowerWeekConstant,
    flow2_ptB = +input[2].value * ptB_flowerWeekConstant,
    flow3_ptB = +input[3].value * ptB_flowerWeekConstant,
    flow4_ptB = +input[4].value * ptB_flowerWeekConstant,
    flow5_ptB = +input[5].value * ptB_flowerWeekConstant,
    flow6_ptB = +input[6].value * ptB_flowerWeekConstant,
    flow7_ptB = +input[7].value * ptB_flowerWeekConstant,
    flow8_ptB = +input[8].value * ptB_flowerWeekConstant,
    flow9_ptB = +input[9].value * ptB_flowerWeekConstant,
    flow1_bloom = +input[1].value * bloom_flowerWeekConstant,
    flow2_bloom = +input[2].value * bloom_flowerWeekConstant,
    flow3_bloom = +input[3].value * bloom_flowerWeekConstant,
    flow4_bloom = +input[4].value * bloom_flowerWeekConstant,
    flow5_bloom = +input[5].value * bloom_flowerWeekConstant,
    flow6_bloom = +input[6].value * bloom_flowerWeekConstant,
    flow7_bloom = +input[7].value * bloom_flowerWeekConstant,
    flow8_bloom = +input[8].value * bloom_flowerWeekConstant,
    flow9_bloom = +input[9].value * bloom_flowerWeekConstant,
    flow1_si = siValueCalculator(input[1].value),
    flow2_si = siValueCalculator(input[2].value),
    flow3_si = siValueCalculator(input[3].value),
    flow4_si = siValueCalculator(input[4].value),
    flow5_si = siValueCalculator(input[5].value),
    flow6_si = siValueCalculator(input[6].value),
    flow7_si = siValueCalculator(input[7].value),
    flow8_si = siValueCalculator(input[8].value),
    flow9_si = siValueCalculator(input[9].value),
    flow1_phosZyme = phosZymeConstant,
    flow2_phosZyme = phosZymeConstant,
    flow3_phosZyme = phosZymeConstant,
    flow4_phosZyme = phosZymeConstant,
    flow5_phosZyme = phosZymeConstant,
    flow6_phosZyme = phosZymeConstant,
    flow7_phosZyme = phosZymeConstant,
    flow8_phosZyme = phosZymeConstant,
    flow9_phosZyme = phosZymeConstant
  /*
  const ptA_EC = 0.322
  const ptB_EC = 0.255
  const blm_EC = 0.18

  const ptA_veg = 4.04
  const ptB_veg = 2.7

  const ptA_flow = 3.25
  const ptB_flow = 2.18
  const blm_flow = 2.56

  const ptB_mLc = 570 / 3785
  const blm_mLc = 667 / 3785

  let veg1_ptA_out2 = (input[0].value / 2) * (ptA_EC * ptA_veg)
  let veg2_ptA_out2 = (input[1].value / 2) * (ptA_EC * ptA_veg)
  let veg3_ptA_out2 = (input[2].value / 2) * (ptA_EC * ptA_veg)
  let flow1_ptA_out2 = (input[3].value / 2) * (ptA_EC * ptA_flow)
  let flow2_ptA_out2 = (input[4].value / 2) * (ptA_EC * ptA_flow)
  let flow3_ptA_out2 = (input[5].value / 2) * (ptA_EC * ptA_flow * 0.95)
  let flow4_ptA_out2 = (input[6].value / 2) * (ptA_EC * ptA_flow * 0.95)
  let flow5_ptA_out2 = (input[7].value / 2) * (ptA_EC * ptA_flow * 0.95)
  let flow6_ptA_out2 = (input[8].value / 2) * (ptA_EC * ptA_flow * 0.9)
  let flow7_ptA_out2 = (input[9].value / 2) * (ptA_EC * ptA_flow * 0.9)

  let veg1_ptB_out2 = (input[0].value / 2) * (ptB_EC * ptB_veg)
  let veg2_ptB_out2 = (input[1].value / 2) * (ptB_EC * ptB_veg)
  let veg3_ptB_out2 = (input[2].value / 2) * (ptB_EC * ptB_veg)
  let flow1_ptB_out2 = (input[3].value / 2) * (ptB_EC * ptB_flow)
  let flow2_ptB_out2 = (input[4].value / 2) * (ptB_EC * ptB_flow)
  let flow3_ptB_out2 = (input[5].value / 2) * (ptB_EC * ptB_flow * 0.95)
  let flow4_ptB_out2 = (input[6].value / 2) * (ptB_EC * ptB_flow * 0.95)
  let flow5_ptB_out2 = (input[7].value / 2) * (ptB_EC * ptB_flow * 0.95)
  let flow6_ptB_out2 = (input[8].value / 2) * (ptB_EC * ptB_flow * 0.9)
  let flow7_ptB_out2 = (input[9].value / 2) * (ptB_EC * ptB_flow * 0.9)

  let veg1_blm_out2 = 0
  let veg2_blm_out2 = 0
  let veg3_blm_out2 = 0
  let flow1_blm_out2 = (input[3].value / 2) * (blm_EC * blm_flow * 0.95)
  let flow2_blm_out2 = (input[4].value / 2) * (blm_EC * blm_flow * 0.95)
  let flow3_blm_out2 = (input[5].value / 2) * (blm_EC * blm_flow * 1.1)
  let flow4_blm_out2 = (input[6].value / 2) * (blm_EC * blm_flow * 1.1)
  let flow5_blm_out2 = (input[7].value / 2) * (blm_EC * blm_flow * 1.1)
  let flow6_blm_out2 = (input[8].value / 2) * (blm_EC * blm_flow * 1.15)
  let flow7_blm_out2 = (input[9].value / 2) * (blm_EC * blm_flow * 1.15)

  $('.veg1_pA_out2').val(veg1_ptA_out2.toFixed(2))
  $('.veg2_pA_out2').val(veg2_ptA_out2.toFixed(2))
  $('.veg3_pA_out2').val(veg3_ptA_out2.toFixed(2))
  $('.flow1_pA_out2').val(flow1_ptA_out2.toFixed(2))
  $('.flow2_pA_out2').val(flow2_ptA_out2.toFixed(2))
  $('.flow3_pA_out2').val(flow3_ptA_out2.toFixed(2))
  $('.flow4_pA_out2').val(flow4_ptA_out2.toFixed(2))
  $('.flow5_pA_out2').val(flow5_ptA_out2.toFixed(2))
  $('.flow6_pA_out2').val(flow6_ptA_out2.toFixed(2))
  $('.flow7_pA_out2').val(flow7_ptA_out2.toFixed(2))

  $('.veg1_pB_out2').val(veg1_ptB_out2.toFixed(2))
  $('.veg2_pB_out2').val(veg2_ptB_out2.toFixed(2))
  $('.veg3_pB_out2').val(veg3_ptB_out2.toFixed(2))
  $('.flow1_pB_out2').val(flow1_ptB_out2.toFixed(2))
  $('.flow2_pB_out2').val(flow2_ptB_out2.toFixed(2))
  $('.flow3_pB_out2').val(flow3_ptB_out2.toFixed(2))
  $('.flow4_pB_out2').val(flow4_ptB_out2.toFixed(2))
  $('.flow5_pB_out2').val(flow5_ptB_out2.toFixed(2))
  $('.flow6_pB_out2').val(flow6_ptB_out2.toFixed(2))
  $('.flow7_pB_out2').val(flow7_ptB_out2.toFixed(2))

  $('.veg1_blm_out2').val(veg1_blm_out2.toFixed(2))
  $('.veg2_blm_out2').val(veg2_blm_out2.toFixed(2))
  $('.veg3_blm_out2').val(veg3_blm_out2.toFixed(2))
  $('.flow1_blm_out2').val(flow1_blm_out2.toFixed(2))
  $('.flow2_blm_out2').val(flow2_blm_out2.toFixed(2))
  $('.flow3_blm_out2').val(flow3_blm_out2.toFixed(2))
  $('.flow4_blm_out2').val(flow4_blm_out2.toFixed(2))
  $('.flow5_blm_out2').val(flow5_blm_out2.toFixed(2))
  $('.flow6_blm_out2').val(flow6_blm_out2.toFixed(2))
  $('.flow7_blm_out2').val(flow7_blm_out2.toFixed(2))

  $('.veg1_total').text(
    `${(Number(veg1_ptA_out2) + Number(veg1_ptB_out2)).toFixed(2)}`
  )
  $('.veg2_total').text(
    `${(Number(veg2_ptA_out2) + Number(veg2_ptB_out2)).toFixed(2)}`
  )
  $('.veg3_total').text(
    `${(Number(veg3_ptA_out2) + Number(veg3_ptB_out2)).toFixed(2)}`
  )
  $('.flow1_total').text(
    `${(
      Number(flow1_ptA_out2) +
      Number(flow1_ptB_out2) +
      Number(flow1_blm_out2)
    ).toFixed(2)}`
  )
  $('.flow2_total').text(
    `${(
      Number(flow2_ptA_out2) +
      Number(flow2_ptB_out2) +
      Number(flow2_blm_out2)
    ).toFixed(2)}`
  )
  $('.flow3_total').text(
    `${(
      Number(flow3_ptA_out2) +
      Number(flow3_ptB_out2) +
      Number(flow3_blm_out2)
    ).toFixed(2)}`
  )
  $('.flow4_total').text(
    `${(
      Number(flow4_ptA_out2) +
      Number(flow4_ptB_out2) +
      Number(flow4_blm_out2)
    ).toFixed(2)}`
  )
  $('.flow5_total').text(
    `${(
      Number(flow5_ptA_out2) +
      Number(flow5_ptB_out2) +
      Number(flow5_blm_out2)
    ).toFixed(2)}`
  )
  $('.flow6_total').text(
    `${(
      Number(flow6_ptA_out2) +
      Number(flow6_ptB_out2) +
      Number(flow6_blm_out2)
    ).toFixed(2)}`
  )
  $('.flow7_total').text(
    `${(
      Number(flow7_ptA_out2) +
      Number(flow7_ptB_out2) +
      Number(flow7_blm_out2)
    ).toFixed(2)}`
  )

  let veg1_ptA_g = veg1_ptA_out2 / ptA_EC
  let veg2_ptA_g = veg2_ptA_out2 / ptA_EC
  let veg3_ptA_g = veg3_ptA_out2 / ptA_EC
  let flow1_ptA_g = flow1_ptA_out2 / ptA_EC
  let flow2_ptA_g = flow2_ptA_out2 / ptA_EC
  let flow3_ptA_g = flow3_ptA_out2 / ptA_EC
  let flow4_ptA_g = flow4_ptA_out2 / ptA_EC
  let flow5_ptA_g = flow5_ptA_out2 / ptA_EC
  let flow6_ptA_g = flow6_ptA_out2 / ptA_EC
  let flow7_ptA_g = flow7_ptA_out2 / ptA_EC

  let veg1_ptB_g = veg1_ptB_out2 / ptB_EC
  let veg2_ptB_g = veg2_ptB_out2 / ptB_EC
  let veg3_ptB_g = veg3_ptB_out2 / ptB_EC
  let flow1_ptB_g = flow1_ptB_out2 / ptB_EC
  let flow2_ptB_g = flow2_ptB_out2 / ptB_EC
  let flow3_ptB_g = flow3_ptB_out2 / ptB_EC
  let flow4_ptB_g = flow4_ptB_out2 / ptB_EC
  let flow5_ptB_g = flow5_ptB_out2 / ptB_EC
  let flow6_ptB_g = flow6_ptB_out2 / ptB_EC
  let flow7_ptB_g = flow7_ptB_out2 / ptB_EC

  let veg1_blm_g = 0
  let veg2_blm_g = 0
  let veg3_blm_g = 0
  let flow1_blm_g = flow1_blm_out2 / blm_EC
  let flow2_blm_g = flow2_blm_out2 / blm_EC
  let flow3_blm_g = flow3_blm_out2 / blm_EC
  let flow4_blm_g = flow4_blm_out2 / blm_EC
  let flow5_blm_g = flow5_blm_out2 / blm_EC
  let flow6_blm_g = flow6_blm_out2 / blm_EC
  let flow7_blm_g = flow7_blm_out2 / blm_EC
  */
  //TODO: Add an error if an option was not selected
  /*if (select.value == 'DtL') {*/

  let decimalPoint = selectedUnit.value === 'imperial' ? 1 : 2
  $('.veg1_pA_out1').val(vegMom_ptA.toFixed(decimalPoint))
  $('.veg2_pA_out1').val(flow1_ptA.toFixed(decimalPoint))
  $('.veg3_pA_out1').val(flow2_ptA.toFixed(decimalPoint))
  $('.flow1_pA_out1').val(flow3_ptA.toFixed(decimalPoint))
  $('.flow2_pA_out1').val(flow4_ptA.toFixed(decimalPoint))
  $('.flow3_pA_out1').val(flow5_ptA.toFixed(decimalPoint))
  $('.flow4_pA_out1').val(flow6_ptA.toFixed(decimalPoint))
  $('.flow5_pA_out1').val(flow7_ptA.toFixed(decimalPoint))
  $('.flow6_pA_out1').val(flow8_ptA.toFixed(decimalPoint))
  $('.flow7_pA_out1').val(flow9_ptA.toFixed(decimalPoint))

  $('.veg1_pB_out1').val(vegMom_ptB.toFixed(decimalPoint))
  $('.veg2_pB_out1').val(flow1_ptB.toFixed(decimalPoint))
  $('.veg3_pB_out1').val(flow2_ptB.toFixed(decimalPoint))
  $('.flow1_pB_out1').val(flow3_ptB.toFixed(decimalPoint))
  $('.flow2_pB_out1').val(flow4_ptB.toFixed(decimalPoint))
  $('.flow3_pB_out1').val(flow5_ptB.toFixed(decimalPoint))
  $('.flow4_pB_out1').val(flow6_ptB.toFixed(decimalPoint))
  $('.flow5_pB_out1').val(flow7_ptB.toFixed(decimalPoint))
  $('.flow6_pB_out1').val(flow8_ptB.toFixed(decimalPoint))
  $('.flow7_pB_out1').val(flow9_ptB.toFixed(decimalPoint))

  $('.veg1_blm_out1').val(vegMom_bloom.toFixed(decimalPoint))
  $('.veg2_blm_out1').val(flow1_bloom.toFixed(decimalPoint))
  $('.veg3_blm_out1').val(flow2_bloom.toFixed(decimalPoint))
  $('.flow1_blm_out1').val(flow3_bloom.toFixed(decimalPoint))
  $('.flow2_blm_out1').val(flow4_bloom.toFixed(decimalPoint))
  $('.flow3_blm_out1').val(flow5_bloom.toFixed(decimalPoint))
  $('.flow4_blm_out1').val(flow6_bloom.toFixed(decimalPoint))
  $('.flow5_blm_out1').val(flow7_bloom.toFixed(decimalPoint))
  $('.flow6_blm_out1').val(flow8_bloom.toFixed(decimalPoint))
  $('.flow7_blm_out1').val(flow9_bloom.toFixed(decimalPoint))
  /* unit.each((i, unit) => (unit.innerText = 'grams'))
  } else if (select.value == 'conc') {
    if (input[0].value == 2.4) {
      $('.veg1_pA_out1').val(22)
    } else {
      $('.veg1_pA_out1').val(Math.floor(veg1_ptA_g / (849 / 3785)))
    }
    if (input[1].value == 2.4) {
      $('.veg2_pA_out1').val(22)
    } else {
      $('.veg2_pA_out1').val(Math.floor(veg2_ptA_g / (849 / 3785)))
    }
    if (input[2].value == 2.4) {
      $('.veg3_pA_out1').val(22)
    } else {
      $('.veg3_pA_out1').val(Math.floor(veg3_ptA_g / (849 / 3785)))
    }

    $('.flow1_pA_out1').val(Math.round(flow1_ptA_g / (849 / 3785)))
    $('.flow2_pA_out1').val(Math.round(flow2_ptA_g / (849 / 3785)))
    $('.flow3_pA_out1').val(Math.round(flow3_ptA_g / (849 / 3785)))
    $('.flow4_pA_out1').val(Math.round(flow4_ptA_g / (849 / 3785)))
    $('.flow5_pA_out1').val(Math.round(flow5_ptA_g / (849 / 3785)))
    $('.flow6_pA_out1').val(Math.round(flow6_ptA_g / (849 / 3785)))
    $('.flow7_pA_out1').val(Math.round(flow7_ptA_g / (849 / 3785)))

    $('.veg1_pB_out1').val(Math.round(veg1_ptB_g / (570 / 3785)))
    $('.veg2_pB_out1').val(Math.round(veg2_ptB_g / (570 / 3785)))
    $('.veg3_pB_out1').val(Math.round(veg3_ptB_g / (570 / 3785)))
    $('.flow1_pB_out1').val(Math.round(flow1_ptB_g / (570 / 3785)))
    $('.flow2_pB_out1').val(Math.round(flow2_ptB_g / (570 / 3785)))
    $('.flow3_pB_out1').val(Math.round(flow3_ptB_g / (570 / 3785)))
    $('.flow4_pB_out1').val(Math.round(flow4_ptB_g / (570 / 3785)))
    $('.flow5_pB_out1').val(Math.round(flow5_ptB_g / (570 / 3785)))
    $('.flow6_pB_out1').val(Math.round(flow6_ptB_g / (570 / 3785)))
    $('.flow7_pB_out1').val(Math.round(flow7_ptB_g / (570 / 3785)))

    //the first 3 weeks need to be a conditionality
    //if input >= 3: output = regular_calc+1; else output = regular_calc
    $('.veg1_blm_out1').value = veg1_blm_g
    $('.veg2_blm_out1').value = veg2_blm_g
    $('.veg3_blm_out1').value = veg3_blm_g
    if (input[3].value >= 3) {
      $('.flow1_blm_out1').value = Math.ceil(flow1_blm_g / (667 / 3785)) + 1
    } else {
      $('.flow1_blm_out1').value = Math.ceil(flow1_blm_g / (667 / 3785))
    }
    if (input[4].value >= 3) {
      $('.flow2_blm_out1').value = Math.ceil(flow2_blm_g / (667 / 3785)) + 1
    } else {
      $('.flow2_blm_out1').value = Math.ceil(flow2_blm_g / (667 / 3785))
    }
    if (input[5].value >= 3) {
      $('.flow3_blm_out1').value = Math.ceil(flow3_blm_g / (667 / 3785)) + 1
    } else {
      $('.flow3_blm_out1').value = Math.round(flow3_blm_g / (667 / 3785))
    }
    $('.flow4_blm_out1').value = Math.round(flow4_blm_g / (667 / 3785))
    $('.flow5_blm_out1').value = Math.round(flow5_blm_g / (667 / 3785))
    $('.flow6_blm_out1').value = Math.round(flow6_blm_g / (667 / 3785))
    $('.flow7_blm_out1').value = Math.round(flow7_blm_g / (667 / 3785))

    unit.each((i, ut) => (ut.innerText = 'ML'))
  }*/
  $('.si_veg1').val(vegMom_si.toFixed(decimalPoint))
  $('.si_veg2').val(flow1_si.toFixed(decimalPoint))
  $('.si_veg3').val(flow2_si.toFixed(decimalPoint))
  $('.si_flow1').val(flow3_si.toFixed(decimalPoint))
  $('.si_flow2').val(flow4_si.toFixed(decimalPoint))
  $('.si_flow3').val(flow5_si.toFixed(decimalPoint))
  $('.si_flow4').val(flow6_si.toFixed(decimalPoint))
  $('.si_flow5').val(flow7_si.toFixed(decimalPoint))
  $('.si_flow6').val(flow8_si.toFixed(decimalPoint))
  $('.si_flow7').val(flow9_si.toFixed(decimalPoint))

  $('.phosZyme_veg1').val(vegMom_phosZyme.toFixed(decimalPoint))
  $('.phosZyme_flow1').val(flow1_phosZyme.toFixed(decimalPoint))
  $('.phosZyme_flow2').val(flow2_phosZyme.toFixed(decimalPoint))
  $('.phosZyme_flow3').val(flow3_phosZyme.toFixed(decimalPoint))
  $('.phosZyme_flow4').val(flow4_phosZyme.toFixed(decimalPoint))
  $('.phosZyme_flow5').val(flow5_phosZyme.toFixed(decimalPoint))
  $('.phosZyme_flow6').val(flow6_phosZyme.toFixed(decimalPoint))
  $('.phosZyme_flow7').val(flow7_phosZyme.toFixed(decimalPoint))
  $('.phosZyme_flow8').val(flow8_phosZyme.toFixed(decimalPoint))
  $('.phosZyme_flow9').val(flow9_phosZyme.toFixed(decimalPoint))

  if (select.value === 'DtL') {
    document.querySelector('#main-table').classList.remove('concShowing')
    document.querySelector('#main-table').classList.add('dtlShowing')
    document.querySelector('#unit option[value="metric"]').innerText =
      'Metric (g/L)'
    document.querySelector('#unit option[value="imperial"]').innerText =
      'US (g/gal)'

    if (document.querySelector('#unit').value === 'metric') {
      document
        .querySelectorAll('#main-table .units .unit')
        .forEach((un) => (un.innerText = 'Grams'))
      document
        .querySelectorAll('#main-table .units  .small')
        .forEach((un) => (un.innerText = 'per liter'))
    } else {
      document
        .querySelectorAll('#main-table .units .unit')
        .forEach((un) => (un.innerText = 'Grams'))
      document
        .querySelectorAll('#main-table .units  .small')
        .forEach((un) => (un.innerText = 'per gallon'))
    }
  } else {
    document.querySelector('#main-table').classList.remove('dtlShowing')
    document.querySelector('#main-table').classList.add('concShowing')
    document.querySelector('#unit option[value="metric"]').innerText =
      'Metric (ml/L)'
    document.querySelector('#unit option[value="imperial"]').innerText =
      'US (ml/gal)'

    if (document.querySelector('#unit').value === 'metric') {
      document
        .querySelectorAll('#main-table .stockRate .unit')
        .forEach(
          (un) =>
            (un.innerText = un
              .closest('.stockRate')
              .classList.contains('frontRowSiRow')
              ? un.closest('.stockRate').getAttribute('data-metric-rate') +
                '  ml'
              : un.closest('.stockRate').getAttribute('data-metric-rate') +
                ' Grams')
        )
      document
        .querySelectorAll('#main-table .stockRate  .small')
        .forEach((un) => (un.innerText = 'per liter'))
    } else {
      document
        .querySelectorAll('#main-table .stockRate .unit')
        .forEach(
          (un) =>
            (un.innerText = un
              .closest('.stockRate')
              .classList.contains('frontRowSiRow')
              ? un.closest('.stockRate').getAttribute('data-us-rate') + '  ml'
              : un.closest('.stockRate').getAttribute('data-us-rate') + ' lbs')
        )
      document
        .querySelectorAll('#main-table .stockRate  .small')
        .forEach((un) => (un.innerText = 'per gallon'))
    }
  }
  /*
  if (input[0].value >= 3.5) {
    $('.si_veg1').val(0.125)
  } else if (input[0].value >= 2.7) {
    $('.si_veg1').val(0.25)
  } else if (input[0].value >= 2.3) {
    $('.si_veg1').val(0.33)
  } else {
    $('.si_veg1').val(0.5)
  }

  if (input[1].value >= 3.5) {
    $('.si_veg2').val(Number(0.125))
  } else if (input[1].value >= 2.7) {
    $('.si_veg2').val(Number(0.25))
  } else if (input[1].value >= 2.3) {
    $('.si_veg2').val(0.33)
  } else {
    $('.si_veg2').val(0.5)
  }

  if (input[2].value >= 3.5) {
    $('.si_veg3').val(Number(0.125))
  } else if (input[2].value >= 2.7) {
    $('.si_veg3').val(Number(0.25))
  } else if (input[2].value >= 2.3) {
    $('.si_veg3').val(Number(0.33))
  } else {
    $('.si_veg3').val(Number(0.5))
  }

  if (input[3].value <= 1.6) {
    $('.si_flow1').val(Number(0.5))
  } else if (input[3].value <= 2.1) {
    $('.si_flow1').val(Number(0.375))
  } else if (input[3].value <= 2.6) {
    $('.si_flow1').val(Number(0.25))
  } else if (input[3].value <= 3.1) {
    $('.si_flow1').val(Number(0.1875))
  } else if (input[3].value <= 3.51) {
    $('.si_flow1').val(Number(0.125))
  } else {
    $('.si_flow1').val(Number(0))
  }

  if (input[4].value <= 1.6) {
    $('.si_flow2').val(Number(0.5))
  } else if (input[4].value <= 2.1) {
    $('.si_flow2').val(Number(0.375))
  } else if (input[4].value <= 2.6) {
    $('.si_flow2').val(Number(0.25))
  } else if (input[4].value <= 3.1) {
    $('.si_flow2').val(Number(0.1875))
  } else if (input[4].value <= 3.51) {
    $('.si_flow2').val(Number(0.125))
  } else {
    $('.si_flow2').val(Number(0))
  }

  if (input[5].value <= 1.6) {
    $('.si_flow3').val(Number(0.5))
  } else if (input[5].value <= 2.1) {
    $('.si_flow3').val(Number(0.375))
  } else if (input[5].value <= 2.6) {
    $('.si_flow3').val(Number(0.25))
  } else if (input[5].value <= 3.1) {
    $('.si_flow3').val(Number(0.1875))
  } else if (input[5].value <= 3.51) {
    $('.si_flow3').val(Number(0.125))
  } else {
    $('.si_flow3').val(Number(0))
  }

  if (input[6].value <= 1.6) {
    $('.si_flow4').val(Number(0.5))
  } else if (input[6].value <= 2.1) {
    $('.si_flow4').val(Number(0.375))
  } else if (input[6].value <= 2.6) {
    $('.si_flow4').val(Number(0.25))
  } else if (input[6].value <= 3.1) {
    $('.si_flow4').val(Number(0.1875))
  } else if (input[6].value <= 3.51) {
    $('.si_flow4').val(Number(0.125))
  } else {
    $('.si_flow4').val(Number(0))
  }

  if (input[7].value <= 1.6) {
    $('.si_flow5').val(Number(0.5))
  } else if (input[7].value <= 2.1) {
    $('.si_flow5').val(Number(0.375))
  } else if (input[7].value <= 2.6) {
    $('.si_flow5').val(Number(0.25))
  } else if (input[7].value <= 3.1) {
    $('.si_flow5').val(Number(0.1875))
  } else if (input[7].value <= 3.51) {
    $('.si_flow5').val(Number(0.125))
  } else {
    $('.si_flow5').val(Number(0))
  }

  if (input[8].value <= 1.6) {
    $('.si_flow6').val(Number(0.5))
  } else if (input[8].value <= 2.1) {
    $('.si_flow6').val(Number(0.375))
  } else if (input[8].value <= 2.6) {
    $('.si_flow6').val(Number(0.25))
  } else if (input[8].value <= 3.1) {
    $('.si_flow6').val(Number(0.1875))
  } else if (input[8].value <= 3.51) {
    $('.si_flow6').val(Number(0.125))
  } else {
    $('.si_flow6').val(Number(0))
  }

  if (input[9].value <= 1.6) {
    $('.si_flow7').val(Number(0.5))
  } else if (input[9].value <= 2.1) {
    $('.si_flow7').val(Number(0.375))
  } else if (input[9].value <= 2.6) {
    $('.si_flow7').val(Number(0.25))
  } else if (input[9].value <= 3.1) {
    $('.si_flow7').val(Number(0.1875))
  } else if (input[9].value <= 3.51) {
    $('.si_flow7').val(Number(0.125))
  } else {
    $('.si_flow7').val(Number(0))
  }*/
}

//Print prompt when "Save As PDF" button is pressed
function saveAsPDF(e) {
  window.print()
  e.preventDefault()
}

//Slide Table in first time Calculate is pressed
function displayTable(e) {
  if ($('.table-container').css('display') === 'none') {
    $('.table-container').css('display', 'block')
    $('.save-pdf').css('display', 'block')

    setTimeout(() => {
      $('.table-container').css('opacity', '1')
      $('.table-container').css('transform', 'none')
      $('.save-pdf').css('opacity', '1')
      $('.save-pdf').css('transform', 'none')
    }, 100)
  } else {
    console.log($('.table-container').css('display'))
  }
}

//Setting the dimensions of the input table to the dimensions of the main table
const setInputTabDim = () => {
  
  const l = document.querySelectorAll('.inputs'),
    e = document.querySelectorAll('.weeks')
  l.forEach((l, o) => {
    l.style.width = `${e[o].offsetWidth}px`
  }),
    document.querySelectorAll('.grayed-out').forEach((l) => {
      l.style.width = `${document.querySelector('.flush').offsetWidth}px`
    }),
    (document.querySelector('.ec_target').style.width = `${
      document.querySelector('.product').offsetWidth +
      document.querySelector('.units-column').offsetWidth
    }px`)
}

//Use more cool looking buttons to choose settings:
document
  .querySelectorAll('.irrigationMetod .optionSelectBtn')
  .forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault()
      document.querySelector('select#type').value =
        button.getAttribute('data-value')
      document.querySelector('select#type').dispatchEvent(new Event('change'))
      button.parentElement
        .querySelector('.optionSelected')
        .classList.remove('optionSelected')
      button.classList.add('optionSelected')
    })
  })
document
  .querySelectorAll('.unitSelectContainer .optionSelectBtn')
  .forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault()
      document.querySelector('select#unit').value =
        button.getAttribute('data-value')
      document.querySelector('select#unit').dispatchEvent(new Event('change'))
      button.parentElement
        .querySelector('.optionSelected')
        .classList.remove('optionSelected')
      button.classList.add('optionSelected')
    })
  })

  setInputTabDim()

