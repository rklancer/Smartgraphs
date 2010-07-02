require 'spec_helper'

describe GuidePageSequencesController do

  def mock_guide_page_sequence(stubs={})
    @mock_guide_page_sequence ||= mock_model(GuidePageSequence, stubs)
  end

  describe "GET index" do
    it "assigns all guide_page_sequences as @guide_page_sequences" do
      GuidePageSequence.stub(:find).with(:all).and_return([mock_guide_page_sequence])
      get :index
      assigns[:guide_page_sequences].should == [mock_guide_page_sequence]
    end
  end

  describe "GET show" do
    it "assigns the requested guide_page_sequence as @guide_page_sequence" do
      GuidePageSequence.stub(:find).with("37").and_return(mock_guide_page_sequence)
      get :show, :id => "37"
      assigns[:guide_page_sequence].should equal(mock_guide_page_sequence)
    end
  end

  describe "GET new" do
    it "assigns a new guide_page_sequence as @guide_page_sequence" do
      GuidePageSequence.stub(:new).and_return(mock_guide_page_sequence)
      get :new
      assigns[:guide_page_sequence].should equal(mock_guide_page_sequence)
    end
  end

  describe "GET edit" do
    it "assigns the requested guide_page_sequence as @guide_page_sequence" do
      GuidePageSequence.stub(:find).with("37").and_return(mock_guide_page_sequence)
      get :edit, :id => "37"
      assigns[:guide_page_sequence].should equal(mock_guide_page_sequence)
    end
  end

  describe "POST create" do

    describe "with valid params" do
      it "assigns a newly created guide_page_sequence as @guide_page_sequence" do
        GuidePageSequence.stub(:new).with({'these' => 'params'}).and_return(mock_guide_page_sequence(:save => true))
        post :create, :guide_page_sequence => {:these => 'params'}
        assigns[:guide_page_sequence].should equal(mock_guide_page_sequence)
      end

      it "redirects to the created guide_page_sequence" do
        GuidePageSequence.stub(:new).and_return(mock_guide_page_sequence(:save => true))
        post :create, :guide_page_sequence => {}
        response.should redirect_to(guide_page_sequence_url(mock_guide_page_sequence))
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved guide_page_sequence as @guide_page_sequence" do
        GuidePageSequence.stub(:new).with({'these' => 'params'}).and_return(mock_guide_page_sequence(:save => false))
        post :create, :guide_page_sequence => {:these => 'params'}
        assigns[:guide_page_sequence].should equal(mock_guide_page_sequence)
      end

      it "re-renders the 'new' template" do
        GuidePageSequence.stub(:new).and_return(mock_guide_page_sequence(:save => false))
        post :create, :guide_page_sequence => {}
        response.should render_template('new')
      end
    end

  end

  describe "PUT update" do

    describe "with valid params" do
      it "updates the requested guide_page_sequence" do
        GuidePageSequence.should_receive(:find).with("37").and_return(mock_guide_page_sequence)
        mock_guide_page_sequence.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :guide_page_sequence => {:these => 'params'}
      end

      it "assigns the requested guide_page_sequence as @guide_page_sequence" do
        GuidePageSequence.stub(:find).and_return(mock_guide_page_sequence(:update_attributes => true))
        put :update, :id => "1"
        assigns[:guide_page_sequence].should equal(mock_guide_page_sequence)
      end

      it "redirects to the guide_page_sequence" do
        GuidePageSequence.stub(:find).and_return(mock_guide_page_sequence(:update_attributes => true))
        put :update, :id => "1"
        response.should redirect_to(guide_page_sequence_url(mock_guide_page_sequence))
      end
    end

    describe "with invalid params" do
      it "updates the requested guide_page_sequence" do
        GuidePageSequence.should_receive(:find).with("37").and_return(mock_guide_page_sequence)
        mock_guide_page_sequence.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :guide_page_sequence => {:these => 'params'}
      end

      it "assigns the guide_page_sequence as @guide_page_sequence" do
        GuidePageSequence.stub(:find).and_return(mock_guide_page_sequence(:update_attributes => false))
        put :update, :id => "1"
        assigns[:guide_page_sequence].should equal(mock_guide_page_sequence)
      end

      it "re-renders the 'edit' template" do
        GuidePageSequence.stub(:find).and_return(mock_guide_page_sequence(:update_attributes => false))
        put :update, :id => "1"
        response.should render_template('edit')
      end
    end

  end

  describe "DELETE destroy" do
    it "destroys the requested guide_page_sequence" do
      GuidePageSequence.should_receive(:find).with("37").and_return(mock_guide_page_sequence)
      mock_guide_page_sequence.should_receive(:destroy)
      delete :destroy, :id => "37"
    end

    it "redirects to the guide_page_sequences list" do
      GuidePageSequence.stub(:find).and_return(mock_guide_page_sequence(:destroy => true))
      delete :destroy, :id => "1"
      response.should redirect_to(guide_page_sequences_url)
    end
  end

end
