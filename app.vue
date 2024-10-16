<template>
  <div id="app">
    <LayoutHeader />
    <LayoutConverter />
  </div>
</template>

<script setup lang="ts">
import '~/assets/scss/application.scss'
useHead({ htmlAttrs: { lang: 'fr' } })
useSeoMeta({
  title: 'Slicy-Money',
  description: 'Convertissez rapidement un montant en son équivalent en monnaie réelle.',
})
</script>
