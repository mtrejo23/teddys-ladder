<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte';
    import { enhance } from '$app/forms';
    import { PortableText } from '@portabletext/svelte';

    let {
        locationInfo,
        form
    } = $props<{
        locationInfo?: any[];
        form: Record<string, any> | null;
    }>();

    let submitting = $state(false);
    let submitted = $state(false);
</script>

<section class="schedule-a-tour">
    <div class="container">
        <div class="grid md:grid--cols-12 gap-2">
            <div class="schedule-a-tour__content grid md:grid--cols-10 gap-2">
                <div class="md:grid--span-3">
                    <div class="schedule-a-tour__content">
                        {#if locationInfo}
                            <PortableText value={locationInfo} />
                        {/if}
                    </div>
                </div>

                <div class="md:grid--span-7">
                    {#if submitted}
                        <div class="success-message">
                            <p>Thank you! We'll be in touch soon to confirm your tour.</p>
                        </div>
                    {:else}

                        <form
                            method="POST"
                            use:enhance={() => {
                                submitting = true;
                                return async ({ result, update }) => {
                                    submitting = false;
                                    if (result.type === 'success') {
                                        submitted = true;
                                    } else {
                                        await update();
                                    }
                                };
                            }}
                        >

                            <div class="visually-hidden" aria-hidden="true">
                                <label for="website">Website</label>
                                <input
                                    type="text"
                                    id="website"
                                    name="website"
                                    tabindex="-1"
                                    autocomplete="off"
                                />
                            </div>

                            <div class="grid lg:grid--cols-2 gap-2 row-gap-1">
                                <div class="flex flex--column">
                                    <label for="first_name">First Name</label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        value={form?.values?.first_name ?? ''}
                                        class:input--error={form?.errors?.first_name}
                                    />
                                    {#if form?.errors?.first_name}
                                        <span class="field-error">{form.errors.first_name[0]}</span>
                                    {/if}
                                </div>

                                <div class="flex flex--column">
                                    <label for="last_name">Last Name</label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        value={form?.values?.last_name ?? ''}
                                        class:input--error={form?.errors?.last_name}
                                    />
                                    {#if form?.errors?.last_name}
                                        <span class="field-error">{form.errors.last_name[0]}</span>
                                    {/if}
                                </div>

                                <div class="flex flex--column">
                                    <label for="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form?.values?.email ?? ''}
                                        class:input--error={form?.errors?.email}
                                    />
                                    {#if form?.errors?.email}
                                        <span class="field-error">{form.errors.email[0]}</span>
                                    {/if}
                                </div>

                                <div class="flex flex--column">
                                    <label for="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        maxlength="12"
                                        value={form?.values?.phone ?? ''}
                                        class:input--error={form?.errors?.phone}
                                        oninput={(e) => {
                                            let v = e.currentTarget.value.replace(/\D/g, '').slice(0, 10);
                                            if (v.length > 6) v = v.slice(0,3) + '-' + v.slice(3,6) + '-' + v.slice(6);
                                            else if (v.length > 3) v = v.slice(0,3) + '-' + v.slice(3);
                                            e.currentTarget.value = v;
                                        }}
                                    />
                                    {#if form?.errors?.phone}
                                        <span class="field-error">{form.errors.phone[0]}</span>
                                    {/if}
                                </div>

                                <div class="lg:grid--span-2">
                                    <fieldset class="flex gap-1" class:input--error={form?.errors?.contact_method}>
                                        <legend>Preferred Contact Method</legend>
                                        <label class="flex flex--items-center gap-0_5">
                                            <input type="radio" name="contact_method" value="email"
                                                checked={form?.values?.contact_method === 'email'} /> Email
                                        </label>
                                        <label class="flex flex--items-center gap-0_5">
                                            <input type="radio" name="contact_method" value="phone"
                                                checked={form?.values?.contact_method === 'phone'} /> Phone
                                        </label>
                                        <label class="flex flex--items-center gap-0_5">
                                            <input type="radio" name="contact_method" value="text"
                                                checked={form?.values?.contact_method === 'text'} /> Text
                                        </label>
                                    </fieldset>
                                    {#if form?.errors?.contact_method}
                                        <span class="field-error">{form.errors.contact_method[0]}</span>
                                    {/if}
                                </div>

                                <div class="flex flex--column">
                                    <label for="tour_date">Desired Tour Date</label>
                                    <input
                                        type="date"
                                        id="tour_date"
                                        name="tour_date"
                                        value={form?.values?.tour_date ?? ''}
                                        class:input--error={form?.errors?.tour_date}
                                    />
                                    {#if form?.errors?.tour_date}
                                        <span class="field-error">{form.errors.tour_date[0]}</span>
                                    {/if}
                                </div>

                                <div class="flex flex--column">
                                    <label for="start_date">Desired Student(s) Start Date</label>
                                    <input
                                        type="date"
                                        id="start_date"
                                        name="start_date"
                                        value={form?.values?.start_date ?? ''}
                                        class:input--error={form?.errors?.start_date}
                                    />
                                    {#if form?.errors?.start_date}
                                        <span class="field-error">{form.errors.start_date[0]}</span>
                                    {/if}
                                </div>

                                <div class="lg:grid--span-2">
                                    <fieldset class="grid lg:grid--cols-2 gap-2">
                                        <legend>Child 1</legend>
                                        <div class="flex flex--column">
                                            <label for="child1_name">Child's Name</label>
                                            <input type="text" id="child1_name" name="child1_name"
                                                value={form?.values?.child1_name ?? ''}
                                                class:input--error={form?.errors?.child1_name}
                                            />
                                            {#if form?.errors?.child1_name}
                                                <span class="field-error">{form.errors.child1_name[0]}</span>
                                            {/if}
                                        </div>
                                        <div class="flex flex--column">
                                            <label for="child1_dob">Desired Student's Birthdate</label>
                                            <input type="date" id="child1_dob" name="child1_dob"
                                                value={form?.values?.child1_dob ?? ''}
                                                class:input--error={form?.errors?.child1_dob}
                                            />
                                            {#if form?.errors?.child1_dob}
                                                <span class="field-error">{form.errors.child1_dob[0]}</span>
                                            {/if}
                                        </div>
                                    </fieldset>
                                </div>

                                <div class="lg:grid--span-2">
                                    <fieldset class="grid lg:grid--cols-2 gap-2">
                                        <legend>Child 2</legend>
                                        <div class="flex flex--column">
                                            <label for="child2_name">Child's Name</label>
                                            <input type="text" id="child2_name" name="child2_name" value={form?.values?.child2_name ?? ''} />
                                        </div>
                                        <div class="flex flex--column">
                                            <label for="child2_dob">Desired Student's Birthdate</label>
                                            <input type="date" id="child2_dob" name="child2_dob" value={form?.values?.child2_dob ?? ''} />
                                        </div>
                                    </fieldset>
                                </div>

                                <div class="lg:grid--span-2">
                                    <fieldset class="grid lg:grid--cols-2 gap-2">
                                        <legend>Child 3</legend>
                                        <div class="flex flex--column">
                                            <label for="child3_name">Child's Name</label>
                                            <input type="text" id="child3_name" name="child3_name" value={form?.values?.child3_name ?? ''} />
                                        </div>
                                        <div class="flex flex--column">
                                            <label for="child3_dob">Desired Student's Birthdate</label>
                                            <input type="date" id="child3_dob" name="child3_dob" value={form?.values?.child3_dob ?? ''} />
                                        </div>
                                    </fieldset>
                                </div>

                                <div class="lg:grid--span-2">
                                    <div class="flex flex--column">
                                        <label for="comments">Comments</label>
                                        <textarea id="comments" name="comments">{form?.values?.comments ?? ''}</textarea>
                                    </div>
                                </div>
                            </div>

                            {#if form?.error}
                                <div class="form-error-banner">{form.error}</div>
                            {/if}

                            <div class="button-wrapper flex flex--justify-end">
                                <Button
                                    text={submitting ? 'Submitting...' : 'Submit'}
                                    disabled={submitting}
                                />
                            </div>
                        </form>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.schedule-a-tour {
    &__content {
        @include a.min(md) {
            grid-column-start: 2;
            grid-column-end: 12;
        }
    }
}

.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

.form-error-banner {
    background-color: a.$clr-pastel-pink;
    color: darkred;
    padding: a.$sp-1;
    border-radius: a.$br-0_5;
    margin-top: a.$sp-1;
    font-size: a.$fs-sm;
}

.field-error {
    color: red;
    font-size: a.$fs-sm;
    margin-top: a.$sp-0_5;
}

.success-message {
    padding: a.$sp-2;
    background-color: a.$clr-pastel-green;
    border-radius: a.$br-0_5;
    text-align: center;
}

form {
    label {
        font-size: a.$fs-sm;
    }

    legend {
        padding-inline: a.$sp-1;
        margin-bottom: a.$sp-0_5;
    }

    input, textarea {
        padding: a.$sp-1;
        border: none;
        background-color: a.$clr-lighter-grey;
        border-radius: a.$br-0_5;
    }

    textarea {
        min-height: 10rem;
    }

    input.input--error {
        outline: 2px solid red;
    }

    ::placeholder {
        color: a.$clr-lighter-grey;
    }

    fieldset {
        border: 1px solid a.$clr-light-grey;
        padding: a.$sp-1;
        margin: 0;
        border-radius: a.$br-0_5;
    }
}
</style>