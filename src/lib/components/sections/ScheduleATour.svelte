<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte';
    import { PortableText } from '@portabletext/svelte';

    let {
        locationInfo,
    } = $props<{
        locationInfo?: any[];
    }>();

    let submitting = $state(false);
    let submitted = $state(false);
    let errors = $state<Record<string, string[]>>({});
    let values = $state<Record<string, string>>({});
    let errorMessage = $state('');

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        submitting = true;
        errors = {};
        errorMessage = '';

        const formData = new FormData(e.currentTarget as HTMLFormElement);

        try {
            const res = await fetch('/api/schedule-a-tour', {
                method: 'POST',
                body: formData,
            });

            const result = await res.json();

            if (res.status === 429) {
                errorMessage = result.error;
            } else if (res.status === 400) {
                errors = result.errors ?? {};
                values = result.values ?? {};
            } else if (result.success) {
                submitted = true;
            }
        } catch {
            errorMessage = 'Something went wrong. Please try again.';
        } finally {
            submitting = false;
        }
    }
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
                        <form onsubmit={handleSubmit}>

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
                                        value={values?.first_name ?? ''}
                                        class:input--error={errors?.first_name}
                                    />
                                    {#if errors?.first_name}
                                        <span class="field-error">{errors.first_name[0]}</span>
                                    {/if}
                                </div>

                                <div class="flex flex--column">
                                    <label for="last_name">Last Name</label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        value={values?.last_name ?? ''}
                                        class:input--error={errors?.last_name}
                                    />
                                    {#if errors?.last_name}
                                        <span class="field-error">{errors.last_name[0]}</span>
                                    {/if}
                                </div>

                                <div class="flex flex--column">
                                    <label for="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={values?.email ?? ''}
                                        class:input--error={errors?.email}
                                    />
                                    {#if errors?.email}
                                        <span class="field-error">{errors.email[0]}</span>
                                    {/if}
                                </div>

                                <div class="flex flex--column">
                                    <label for="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        maxlength="12"
                                        value={values?.phone ?? ''}
                                        class:input--error={errors?.phone}
                                        oninput={(e) => {
                                            let v = e.currentTarget.value.replace(/\D/g, '').slice(0, 10);
                                            if (v.length > 6) v = v.slice(0,3) + '-' + v.slice(3,6) + '-' + v.slice(6);
                                            else if (v.length > 3) v = v.slice(0,3) + '-' + v.slice(3);
                                            e.currentTarget.value = v;
                                        }}
                                    />
                                    {#if errors?.phone}
                                        <span class="field-error">{errors.phone[0]}</span>
                                    {/if}
                                </div>

                                <div class="lg:grid--span-2">
                                    <fieldset class="flex gap-1" class:input--error={errors?.contact_method}>
                                        <legend>Preferred Contact Method</legend>
                                        <label class="flex flex--items-center gap-0_5">
                                            <input type="radio" name="contact_method" value="email"
                                                checked={values?.contact_method === 'email'} /> Email
                                        </label>
                                        <label class="flex flex--items-center gap-0_5">
                                            <input type="radio" name="contact_method" value="phone"
                                                checked={values?.contact_method === 'phone'} /> Phone
                                        </label>
                                        <label class="flex flex--items-center gap-0_5">
                                            <input type="radio" name="contact_method" value="text"
                                                checked={values?.contact_method === 'text'} /> Text
                                        </label>
                                    </fieldset>
                                    {#if errors?.contact_method}
                                        <span class="field-error">{errors.contact_method[0]}</span>
                                    {/if}
                                </div>

                                <div class="flex flex--column">
                                    <label for="tour_date">Desired Tour Date</label>
                                    <input
                                        type="date"
                                        id="tour_date"
                                        name="tour_date"
                                        value={values?.tour_date ?? ''}
                                        class:input--error={errors?.tour_date}
                                    />
                                    {#if errors?.tour_date}
                                        <span class="field-error">{errors.tour_date[0]}</span>
                                    {/if}
                                </div>

                                <div class="flex flex--column">
                                    <label for="start_date">Desired Student(s) Start Date</label>
                                    <input
                                        type="date"
                                        id="start_date"
                                        name="start_date"
                                        value={values?.start_date ?? ''}
                                        class:input--error={errors?.start_date}
                                    />
                                    {#if errors?.start_date}
                                        <span class="field-error">{errors.start_date[0]}</span>
                                    {/if}
                                </div>

                                <div class="lg:grid--span-2">
                                    <fieldset class="grid lg:grid--cols-2 gap-2">
                                        <legend>Child 1</legend>
                                        <div class="flex flex--column">
                                            <label for="child1_name">Child's Name</label>
                                            <input type="text" id="child1_name" name="child1_name"
                                                value={values?.child1_name ?? ''}
                                                class:input--error={errors?.child1_name}
                                            />
                                            {#if errors?.child1_name}
                                                <span class="field-error">{errors.child1_name[0]}</span>
                                            {/if}
                                        </div>
                                        <div class="flex flex--column">
                                            <label for="child1_dob">Desired Student's Birthdate</label>
                                            <input type="date" id="child1_dob" name="child1_dob"
                                                value={values?.child1_dob ?? ''}
                                                class:input--error={errors?.child1_dob}
                                            />
                                            {#if errors?.child1_dob}
                                                <span class="field-error">{errors.child1_dob[0]}</span>
                                            {/if}
                                        </div>
                                    </fieldset>
                                </div>

                                <div class="lg:grid--span-2">
                                    <fieldset class="grid lg:grid--cols-2 gap-2">
                                        <legend>Child 2</legend>
                                        <div class="flex flex--column">
                                            <label for="child2_name">Child's Name</label>
                                            <input type="text" id="child2_name" name="child2_name" value={values?.child2_name ?? ''} />
                                        </div>
                                        <div class="flex flex--column">
                                            <label for="child2_dob">Desired Student's Birthdate</label>
                                            <input type="date" id="child2_dob" name="child2_dob" value={values?.child2_dob ?? ''} />
                                        </div>
                                    </fieldset>
                                </div>

                                <div class="lg:grid--span-2">
                                    <fieldset class="grid lg:grid--cols-2 gap-2">
                                        <legend>Child 3</legend>
                                        <div class="flex flex--column">
                                            <label for="child3_name">Child's Name</label>
                                            <input type="text" id="child3_name" name="child3_name" value={values?.child3_name ?? ''} />
                                        </div>
                                        <div class="flex flex--column">
                                            <label for="child3_dob">Desired Student's Birthdate</label>
                                            <input type="date" id="child3_dob" name="child3_dob" value={values?.child3_dob ?? ''} />
                                        </div>
                                    </fieldset>
                                </div>

                                <div class="lg:grid--span-2">
                                    <div class="flex flex--column">
                                        <label for="comments">Comments</label>
                                        <textarea id="comments" name="comments">{values?.comments ?? ''}</textarea>
                                    </div>
                                </div>
                            </div>

                            {#if errorMessage}
                                <div class="form-error-banner">{errorMessage}</div>
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