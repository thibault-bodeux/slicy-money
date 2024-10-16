<template>
  <main id="layout-converter">
    <form class="form u-container" @submit.prevent="">
      <div class="form-input" :class="'is-' + state">
        <label for="amount-value">Montant</label>
        <input id="amount-value" v-model="_amount.input" type="text" name="amount-value" placeholder="123.45" @keyup="state = State.Empty" @change="validateAmount">
        <p class="input-hint">
          <Icon class="icon icon-hint" name="heroicons-solid:question-mark-circle" style="font-size: 1.15rem"/>
          <Icon class="icon icon-invalid" name="heroicons-solid:exclamation-circle" style="font-size: 1.15rem"/>
          <Icon class="icon icon-valid" name="heroicons-solid:check-circle" style="font-size: 1.15rem"/>
          Un montant entier avec au maximum 2 décimales.
        </p>
      </div>
      <div class="form-actions">
        <button class="button button-primary" @click="submitAmount">Convertir</button>
        <!-- <button class="button button-secondary">Options</button> -->
      </div>
    </form>
    <section id="layout-result" class="u-container">
      <ul>
        <li v-for="item in response" :key="item.value">
          <span class="result-curency"><strong>{{ item.quantity }}</strong> {{ item.label.type + (item.quantity > 1 ? "s" : '') }} de <strong>{{ item.label.value }}</strong> {{ item.label.currency }}</span>
          <span class="result-total">{{ item.total / 100 }}€</span>
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const _amount = useAmountStore()
enum State { Valid = 'valid', Invalid = 'invalid', Empty = 'empty' }
const state: Ref<State> = ref(State.Empty)
const response: Ref<Amount.Result[]> = ref([])

function gsapAnimationErrorInput() {
  const timeline = gsap.timeline({ ease: 'power2.inOut' })
  timeline.to('input#amount-value', { duration: (0.25 / 3), x: '-0.25rem' })
  timeline.to('input#amount-value', { duration: (0.25 / 3), x: '0.25rem' })
  timeline.to('input#amount-value', { duration: (0.25 / 3), x: '0' })
  timeline.play()
  if (response.value.length > 0) gsap.to('li', { duration: 0.2, opacity: 0, x: -24, stagger: -0.1 }).then(setResult)
}

function validateAmount() {
  state.value = _amount.isValid ? State.Valid : State.Invalid
}

async function setResult() {
  response.value = _amount.convert()
  await nextTick()
  gsap.set('li', { opacity: 0, x: -24 })
  gsap.to('li', { duration: 0.2, opacity: 1, x: 0, stagger: 0.1 })
}

async function submitAmount() {
  validateAmount()
  if (state.value === State.Invalid) return gsapAnimationErrorInput()
  if (JSON.stringify(response.value) === JSON.stringify(_amount.convert())) return
  if (response.value.length > 0) gsap.to('li', { duration: 0.2, opacity: 0, x: -24, stagger: -0.1 }).then(setResult)
  else setResult()
}
</script>
